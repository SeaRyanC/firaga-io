import { PrintOptions } from "./download-bar";
import { PlanSettings } from "./plan-settings";
import { PartListImage } from "./firaga";
import { carve, colorEntryToHex, getPitch, hx, symbolAlphabet } from "./utils";

function correctionToNumber(n: PrintOptions["correction"]) {
    switch (n) {
        case "1": return 1;
        case "100/96": return 100 / 96;
        default: throw new Error(n);
    }
}

export async function makePdf(image: PartListImage, planSettings: PlanSettings, printOptions: PrintOptions) {
    let pitch = getPitch(planSettings.size);
    // Correction for my shitty printer?
    pitch = pitch * correctionToNumber(printOptions.correction);
    const carveSize = printOptions.carveSize === "none" ? [image.width, image.height] : [50, 50] as const;

    // A4: 210x297
    // Letter: 8.5x11
    // Anecdotally, ~all printers support quarter-inch margins

    const pageMargins = {
        left: 25.4 / 2,
        right: 25.4 / 2,
        bottom: 25.4 / 2,
        top: 25.4 / 2
    };

    // Space between adjacent grids
    const gridMargin = 4;

    const textHeight = 2;
    const gridSize = {
        width: pitch * Math.min(image.width, carveSize[0]),
        height: pitch * Math.min(image.height, carveSize[1])
    };

    // Actual padded size of a cell
    const cellSize = {
        width: gridSize.width + gridMargin * 2,
        height: gridSize.height + textHeight + gridMargin * 2
    };

    // TODO: Refactor this so that cells which would fit better
    // if the whole thing was rotated cause the page orientation to change
    let pageWidth: number, pageHeight: number;
    let orientation: "landscape" | "portrait";
    if (printOptions.paperSize === "letter") {
        pageWidth = 8.5 * 25.4;
        pageHeight = 11 * 25.4;
        orientation = "portrait";
    } else if (printOptions.paperSize === "A4") {
        pageWidth = 210;
        pageHeight = 297;
        orientation = "portrait";
    } else if (printOptions.paperSize === "fit") {
        pageWidth = cellSize.width;
        pageHeight = cellSize.height;
        orientation = cellSize.width > cellSize.height ? "landscape" : "portrait"
    } else {
        throw new Error(printOptions.paperSize);
    }

    const printableAreaSize = {
        width: pageWidth - pageMargins.left - pageMargins.right,
        height: pageHeight - pageMargins.bottom - pageMargins.top
    };

    // New PDF
    const jspdfMod = await import("jspdf");
    const doc = new jspdfMod.jsPDF({
        unit: "mm",
        format: [pageWidth, pageHeight],
        orientation
    });

    // Number of cells we can fit on the same page
    const cols = Math.floor(printableAreaSize.width / cellSize.width);
    const rows = Math.floor(printableAreaSize.height / cellSize.height);
    let rowCursor = 0, colCursor = -1;

    const slices = carve(image.width, image.height, carveSize[0], carveSize[1]);
    if (slices.length > 1) {
        // Print slice diagram
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.setFillColor(0, 0, 0);
        const sliceScale = 1 / 2;
        for (let i = 0; i < slices.length; i++) {
            let x = pageMargins.left + slices[i].x * sliceScale;
            let y = pageMargins.top + slices[i].y * sliceScale;
            doc.rect(x, y, slices[i].width * sliceScale, slices[i].height * sliceScale);
            doc.text(symbolAlphabet[i],
                x + (slices[i].width / 2) * sliceScale,
                y + (slices[i].height / 2) * sliceScale,
                { baseline: "middle", align: "center" });
        }
        doc.addPage();
    }

    doc.setFont("Helvetica");
    doc.setFontSize(7);
    doc.setFillColor(0, 0, 0);

    const ctx = doc.context2d;

    if (printOptions.style === "stepped") {
        // Print each color in order
        for (let i = 0; i < image.partList.length; i++) {
            // Print each slice
            for (let si = 0; si < slices.length; si++) {
                // Skip any slices with zero pixels to lay down
                const slice = slices[si];
                let realCount = 0;
                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        if (image.pixels[y][x] === image.partList[i]) {
                            realCount++;
                        }
                    }
                }
                if (realCount === 0) continue;

                // Print the slice
                nextCellLocation();

                ctx.save();
                ctx.font = "4pt Helvetica";
                ctx.translate(colCursor * cellSize.width + pageMargins.top, rowCursor * cellSize.height + pageMargins.left);
                ctx.translate(gridMargin, gridMargin);
                if (slices.length > 1) {
                    ctx.fillText(`Cell ${symbolAlphabet[si]}: ${image.partList[i].target.code} (${image.partList[i].target.name}) × ${realCount}`, 0, 0);
                } else {
                    ctx.fillText(`${image.partList[i].target.code} (${image.partList[i].target.name}) × ${realCount}`, 0, 0);
                }
                ctx.translate(0, textHeight);
                ctx.lineWidth = 0.01;
                if (printOptions.color === "color") {
                    ctx.fillStyle = colorEntryToHex(image.partList[i].target);
                } else {
                    ctx.fillStyle = "black";
                }
                ctx.strokeStyle = "grey";
                ctx.strokeRect(0, 0, slice.width * pitch, slice.height * pitch);
                ctx.font = `${pitch}mm Helvetica`;
                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        if (image.pixels[y][x] === image.partList[i]) {
                            if (printOptions.color === "bw-min") {
                                ctx.strokeRect((x - slice.x) * pitch, (y - slice.y) * pitch, pitch, pitch);
                            } if (printOptions.color === "bw-max") {
                                ctx.fillRect((x - slice.x) * pitch, (y - slice.y) * pitch, pitch, pitch);
                            }
                        } else {
                            for (let j = 0; j < i; j++) {
                                if (image.pixels[y][x] === image.partList[j]) {
                                    ctx.fillRect((x - slice.x + 0.4) * pitch, (y - slice.y + 0.4) * pitch, pitch * 0.2, pitch * 0.2);
                                }
                            }
                        }
                    }
                }
                ctx.restore();
            }
        }
    } else if (printOptions.style === "single") {
        for (let si = 0; si < slices.length; si++) {
            nextCellLocation();
            const slice = slices[si];
            for (let y = slice.y; y < slice.y + slice.height; y++) {
                for (let x = slice.x; x < slice.x + slice.width; x++) {
                    const px = image.pixels[y][x];
                    if (px !== undefined) {
                        if (printOptions.color === "color") {
                            ctx.fillStyle = colorEntryToHex(px.target);
                        } else {
                            ctx.fillStyle = "black";
                        }
                        for (let i = 0; i < image.partList.length; i++) {
                            if (image.partList[i] === px) {
                                ctx.fillText(symbolAlphabet[i], (x - slice.x + 0.15) * pitch, (y - slice.y + 1) * pitch);
                            }
                        }
                    }
                }
            }
        }
    }
    doc.save("plan.pdf");

    function nextCellLocation() {
        colCursor++
        if (colCursor === cols) {
            colCursor = 0;
            rowCursor++;
            if (rowCursor === rows) {
                doc.addPage();
                rowCursor = 0;
            }
        }
    }
}
