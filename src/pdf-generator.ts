import { PrintOptions } from "./download-bar";
import { PlanSettings } from "./plan-settings";
import { PartListImage } from "./firaga";
import { carve, colorEntryToHex, getPitch, hx, symbolAlphabet } from "./utils";

declare const jspdf: typeof import("jspdf");

function correctionToNumber(n: PrintOptions["correction"]) {
    return +n;
}

export async function makePdf(image: PartListImage, planSettings: PlanSettings, printOptions: PrintOptions) {
    loadPdfAnd(() => makePdfWorker(image, planSettings, printOptions));
}

async function loadPdfAnd(func: () => void) {
    const tagName = "pdf-script-tag";
    // Load PDF.js from CDN if it's not already loaded
    const scriptEl = document.getElementById(tagName);
    if (scriptEl === null) {
        const tag = document.createElement("script");
        tag.id = tagName;
        tag.onload = () => {
            func();
        };
        tag.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js";
        document.head.appendChild(tag);
    } else {
        func();
    }
}

export function makeTestSheet() {
    loadPdfAnd(() => {
        const marginX = 30;
        const marginY = 30;

        const doc = new jspdf.jsPDF({
            unit: "mm",
            format: [200, 200]
        });
        const text =
            `firaga.io Printer Test Sheet

Print this page at 100% scale and check it with a ruler`;
        doc.text(text, marginX, marginY, { maxWidth: 200 - marginX * 2 });

        doc.setFontSize(12);

        let y = 20 + marginY;

        calib(0, "Metric")
        calib(100, "If this line is exactly 100mm, you have correct calibration");
        calib(100 * 100 / 96, "If this line is exactly 100mm, set your printer scale to 104.2%");
        calib(96, "If this line is exactly 100mm, set your printer scale to 96%");

        calib(0, "Imperial")
        calib(25.4 * 5, "If this line is exactly 5 inches, you have correct calibration");
        calib(25.4 * 5 * 100 / 96, "If this line is exactly 5 inches, set your printer scale to 104.2%");
        calib(25.4 * 5 * 96 / 100, "If this line is exactly 5 inches, set your printer scale to 96%");

        function calib(length: number, text: string) {
            doc.setFontSize(length === 0 ? 14 : 12);
            doc.text(text, marginX, y, { baseline: "top", maxWidth: 200 - marginX * 2 });
            if (length !== 0) {
                doc.line(marginX, y + 6, marginX + length, y + 6);
            }

            y += 14;
        }

        doc.save("plan.pdf");
    });
}

function makePdfWorker(image: PartListImage, planSettings: PlanSettings, printOptions: PrintOptions) {
    let pitch = getPitch(planSettings.size);
    // Correction for bad printers
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
    const minimumGridMargin = 2;

    const skewThickness = {
        "none": 0,
        "low": 3,
        "medium": 6,
        "high": 14
    }[printOptions.skew];

    // Perspective correction
    const observerHeight = 17 * 25.4;
    const observerDistance = 8 * 25.4;
    const minTheta = Math.atan2(observerHeight, observerDistance);
    const maxTheta = Math.atan2(observerHeight, observerDistance + carveSize[1] * pitch);
    const minPerspectiveOffset = Math.tan(maxTheta) * skewThickness;
    const maxPerspectiveOffset = Math.tan(minTheta) * skewThickness;
    const netPerspectiveOffset = maxPerspectiveOffset - minPerspectiveOffset;

    const textHeight = 4;
    const gridSize = {
        width: pitch * Math.min(image.width, carveSize[0]),
        height: pitch * Math.min(image.height, carveSize[1]) + netPerspectiveOffset
    };

    // Actual size of a cell
    const cellSize = {
        width: gridSize.width,
        height: gridSize.height + textHeight
    };

    let orientation: "landscape" | "portrait" = "" as any;
    let paperWidth: number, paperHeight: number;
    let rows = 1, cols = 1;
    if (printOptions.paperSize === "fit") {
        paperWidth = cellSize.width;
        paperHeight = cellSize.height;
        orientation = cellSize.width > cellSize.height ? "landscape" : "portrait"
    } else if (printOptions.paperSize === "letter") {
        paperWidth = 8.5 * 25.4;
        paperHeight = 11 * 25.4;
    } else if (printOptions.paperSize === "A4") {
        paperWidth = 210;
        paperHeight = 297;
    } else {
        throw new Error(printOptions.paperSize);
    }

    const printableAreaSize = {
        width: paperWidth - pageMargins.left - pageMargins.right,
        height: paperHeight - pageMargins.bottom - pageMargins.top
    };

    if (printOptions.paperSize !== "fit") {
        const layout = getLayout(printableAreaSize.width, printableAreaSize.height, gridSize.width, gridSize.height, image.partList.length, minimumGridMargin);
        rows = layout.rows;
        cols = layout.cols;
        orientation = layout.orientation;
    }

    const finalWidth = orientation === "landscape" ? printableAreaSize.height : printableAreaSize.width;
    const finalHeight = orientation === "landscape" ? printableAreaSize.width : printableAreaSize.height;

    // New PDF
    const doc = new jspdf.jsPDF({
        unit: "mm",
        format: [paperWidth, paperHeight],
        orientation
    });

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

    const horizontalGridMargin = (finalWidth - (cols * cellSize.width)) / (cols + 1);
    const verticalGridMargin = (finalHeight - (rows * cellSize.height)) / (rows + 1);
    ctx.translate(horizontalGridMargin, verticalGridMargin);

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

                // Resuable row-to-mm-position function
                const yAt = (rawY: number) => {
                    const adjY = (rawY - slice.y);
                    const rowTheta = Math.atan2(observerHeight, observerDistance + (adjY * pitch));
                    const ySkew = maxPerspectiveOffset - Math.tan(rowTheta) * skewThickness;
                    return (adjY + 0.5) * pitch + ySkew;
                };

                ctx.save();

                // Print the header
                ctx.font = "4pt Helvetica";
                ctx.translate(colCursor * (cellSize.width + horizontalGridMargin) + pageMargins.top, rowCursor * (cellSize.height + verticalGridMargin) + pageMargins.left);
                const text = slices.length === 1 ?
                    `${image.partList[i].target.code} (${image.partList[i].target.name})` :
                    `Cell ${symbolAlphabet[si]}: ${image.partList[i].target.code} (${image.partList[i].target.name})`
                ctx.textBaseline = "top";
                ctx.fillText(text, 0, 0, cellSize.width);

                // Draw the grid outline
                ctx.translate(0, textHeight);
                ctx.lineWidth = 0.01;
                ctx.strokeStyle = "grey";
                ctx.strokeRect(0, 0, gridSize.width, gridSize.height);

                // Fill in the own pixels
                if (printOptions.color === "color") {
                    ctx.fillStyle = colorEntryToHex(image.partList[i].target);
                } else {
                    ctx.fillStyle = "black";
                }
                ctx.beginPath();
                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    const cy = yAt(y);
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        if (image.pixels[y][x] === image.partList[i]) {
                            ctx.arc((x - slice.x + 0.5) * pitch, cy, pitch / 2.5, 0, Math.PI * 2, false);
                        }
                    }
                }
                if (printOptions.color === "bw-min") {
                    ctx.stroke();
                } else {
                    ctx.fill();
                }
                ctx.closePath();

                // Prior-fill outlining
                ctx.beginPath();

                // Compute matrix of prior-fill
                const prevFill: boolean[][] = [];
                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    const row = [];
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        let prev = false;
                        for (let j = 0; j < i; j++) {
                            if (image.pixels[y][x] === image.partList[j]) {
                                prev = true;
                                break;
                            }
                        }
                        row.push(prev);
                    }
                    prevFill.push(row);
                }

                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    const py = y - slice.y;
                    const yTop = yAt(y - 0.5);
                    const yBottom = yAt(y + 0.5);
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        const px = x - slice.x;
                        if (prevFill[py][px]) {
                            // Above
                            if (py !== 0 && !prevFill[y - 1][px]) {
                                ctx.moveTo((px + 0) * pitch, yTop);
                                ctx.lineTo((px + 1) * pitch, yTop);
                            }
                            // Below
                            if (py !== prevFill.length - 1 && !prevFill[y + 1][px]) {
                                ctx.moveTo((px + 0) * pitch, yBottom);
                                ctx.lineTo((px + 1) * pitch, yBottom);
                            }
                            // Left
                            if (!prevFill[y][px - 1]) {
                                ctx.moveTo(px * pitch, yTop);
                                ctx.lineTo(px * pitch, yBottom);
                            }
                            // Right
                            if (!prevFill[y][px + 1]) {
                                ctx.moveTo((px + 1) * pitch, yTop);
                                ctx.lineTo((px + 1) * pitch, yBottom);
                            }
                        }
                    }
                }

                ctx.stroke();
                ctx.closePath();

                ctx.restore();
            }
        }
    } else if (printOptions.style === "single") {
        // TODO: Apply perspective correction here
        for (let si = 0; si < slices.length; si++) {
            nextCellLocation();
            ctx.translate(pageMargins.top, pageMargins.left);
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

    // Fixed in upstream jspdf but not published yet; remove eventually
    // @ts-expect-error
    doc.output("dataurlnewwindow", { filename: "plan.pdf" });

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

function getLayout(printableWidth: number, printableHeight: number, cellWidth: number, cellHeight: number, cellCount: number, minumumMargin: number) {
    // Landscape
    const landscape = {
        orientation: "landscape",
        ...tryLayout(printableHeight, printableWidth)
    } as const;

    // Portrait
    const portrait = {
        orientation: "portrait",
        ...tryLayout(printableWidth, printableHeight)
    } as const;

    // TODO: Rework this logic to just always return the fewest-pages most-whitespace solution
    // If both are suitable to 1-page it, use the one with the fewest cells
    if (portrait.rows * portrait.cols >= cellCount) {
        if (landscape.rows * landscape.cols >= cellCount) {
            return (landscape.rows * landscape.cols) < (portrait.rows * portrait.cols) ? landscape : portrait;
        }
        return portrait;
    } 
    // Else just use whatever packs more cells in
    return (landscape.rows * landscape.cols) > (portrait.rows * portrait.cols) ? landscape : portrait;

    function tryLayout(pageWidth: number, pageHeight: number) {
        let rows = Math.floor((pageHeight + minumumMargin) / (cellHeight + minumumMargin));
        let cols = Math.floor((pageWidth + minumumMargin) / (cellWidth + minumumMargin));

        while (true) {
            if (rows > cols) {
                if (tryDecr(() => rows--)) continue;
                if (tryDecr(() => cols--)) continue;
            } else {
                if (tryDecr(() => cols--)) continue;
                if (tryDecr(() => rows--)) continue;
            }
            break;
        }
        return { rows, cols };

        function tryDecr(f: () => void) {
            let or = rows, oc = cols;
            f();
            if (rows * cols < cellCount) {
                rows = or;
                cols = oc;
                return false;
            }
            return true;
        }
    }
}
