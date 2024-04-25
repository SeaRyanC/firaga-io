import { PartListEntry, PartListImage } from "./image-utils";
import { carve, colorEntryToHex, getPitch, hx, nameOfColor, symbolAlphabet } from "./utils";

declare const PDFDocument: typeof import("pdfkit");
declare const blobStream: typeof import("blob-stream");

declare const jspdf: typeof import("jspdf");

export async function makePdf(image: PartListImage, settings: PrintSettings) {
    loadPdfAnd(() => makePdfWorker(image, settings));
}

async function loadPdfAnd(func: () => void) {
    const tagName = "pdf-script-tag";
    // Load PDF.js from CDN if it's not already loaded
    const scriptEl = document.getElementById(tagName);
    if (scriptEl === null) {
        const tag1 = document.createElement("script");
        tag1.id = tagName;
        tag1.onload = () => {
            func();
        };
        tag1.src = "https://github.com/foliojs/pdfkit/releases/download/v0.12.1/pdfkit.standalone.js";
        document.head.appendChild(tag1);
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

        doc.save("calibration.pdf");
    });
}

export interface PrintSettings {
    pitch: number;
    carveSize: readonly [number, number];
    breakStrategy: "grid" | "page";
    imageSize: "single-page" | "actual" | "legible";
    paperSize: "a4" | "letter";
    style: "step-by-step" | "legend" | "color" | "spanned-legend";
    filename: string;

    // perspective: "off" | "low" | "medium" | "high";
    debug: boolean;
}

function makePdfWorker(image: PartListImage, settings: PrintSettings) {
    // Anecdotally, ~all printers support quarter-inch margins
    // 1/3 seems good.
    const pageMarginPts = inchesToPoints(1 / 3);
    const doc = new PDFDocument({
        size: settings.paperSize
    });
    const stream = doc.pipe(blobStream());

    if (settings.style === "legend") {
        drawLegend(doc, image);
    }

    const paperWidthPts = doc.page.width;
    const paperHeightPts = doc.page.height;

    const printableWidthPts = paperWidthPts - pageMarginPts * 2;
    const printableHeightPts = paperHeightPts - pageMarginPts * 2;

    // Space above each grid cell for caption / map purposes
    const cellHeaderHeightPts = doc.heightOfString("Testing");

    let pitchPts: number;
    if (settings.imageSize === "actual") {
        pitchPts = mmToPoints(settings.pitch);
    } else if (settings.imageSize === "legible") {
        if (settings.breakStrategy === "grid") {
            // Breaking on grid boundaries means we might need to take a
            // legibility hit to fit one grid per page

            // TODO: This doesn't quite account for the possibility of non-square grids, which
            // might be rotated to improve fit
            pitchPts = 0.99 * Math.min((printableWidthPts - cellHeaderHeightPts) / settings.carveSize[0], (printableHeightPts - cellHeaderHeightPts) / settings.carveSize[1]);
        } else {
            pitchPts = mmToPoints(4);
        }
    } else {
        // settings.imageSize == "single-page"
        if (image.width >= image.height) {
            pitchPts = Math.min((printableWidthPts - cellHeaderHeightPts) / image.height, (printableHeightPts - cellHeaderHeightPts) / image.width);
        } else {
            pitchPts = Math.min((printableWidthPts - cellHeaderHeightPts) / image.width, (printableHeightPts - cellHeaderHeightPts) / image.height);
        }
    }

    let carveSize: readonly [number, number];
    if (settings.imageSize === "single-page") {
        // No need to carve; we already set pitch appropriately
        carveSize = [Infinity, Infinity];
    } else if (settings.breakStrategy === "grid") {
        carveSize = settings.carveSize;
    } else {
        // settings.breakStrategy === "page"
        carveSize = [Math.floor((printableWidthPts - cellHeaderHeightPts) / pitchPts), Math.floor((printableHeightPts - cellHeaderHeightPts) / pitchPts)];
    }

    const slices = generateImageSlices(image, carveSize);
    const sliceWidth = Math.max.apply(Math.max, slices.map(s => s.width));
    const sliceHeight = Math.max.apply(Math.max, slices.map(s => s.height));

    const gridSizePts = {
        width: pitchPts * sliceWidth,
        height: pitchPts * sliceHeight
    };

    // Place the label text on the longest edge of the cell, favoring
    // keeping it on the top if the image is squarish
    const textPlacement = gridSizePts.width * 1.2 > gridSizePts.height ? "top" : "side";

    // Actual size of a cell (without margin)
    const imageCellSizePts = {
        width: gridSizePts.width + (textPlacement === "side" ? cellHeaderHeightPts : 0),
        height: gridSizePts.height + (textPlacement === "top" ? cellHeaderHeightPts : 0)
    };

    if (settings.debug) {
        doc.rect(pageMarginPts, pageMarginPts, paperWidthPts - pageMarginPts * 2, paperHeightPts - pageMarginPts * 2);
        doc.stroke("red");
    }

    if (settings.style === "step-by-step") {
        // Precompute how many actual slices there are to print
        const slicesToPrint: { partIndex: number, slice: Slice }[] = [];
        for (const slice of slices) {
            // Print each color in order, computing an already-done map while we do
            const doneMap: boolean[][] = [];
            for (let y = 0; y < slice.height; y++) {
                doneMap[y] = [];
                for (let x = 0; x < slice.width; x++) {
                    doneMap[y][x] = false;
                }
            }

            for (let i = 0; i < image.partList.length; i++) {
                // Skip any slices with zero pixels to lay down
                if (isAnyPixel(slice, p => p === image.partList[i])) {
                    slicesToPrint.push({ partIndex: i, slice });
                }
            }
        }

        const layout = getLayout(slicesToPrint.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);

        const multipleSlices = slices.length > 1;
        for (const stp of slicesToPrint) {
            const pos = layout.shift()!;
            const done = pos.next(doc, stp.slice.width * pitchPts, stp.slice.height * pitchPts);
            printSteppedSlice({
                doc,
                image,
                partIndex: stp.partIndex,
                slice: stp.slice,
                pitch: pitchPts,
                textPlacement,
                cellHeaderHeightPts,
                multipleSlices,
                debug: settings.debug
            });
            done();
        }
    } else if (settings.style === "color") {
        const layout = getLayout(slices.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);
        for (const slice of slices) {
            const pos = layout.shift()!;
            const done = pos.next(doc, slice.width * pitchPts, slice.height * pitchPts);
            if (settings.debug) {
                doc.rect(0, 0, slice.width * pitchPts, slice.height * pitchPts);
                doc.stroke("blue");
            }

            for (let i = 0; i < image.partList.length; i++) {
                for (let y = slice.y; y < slice.y + slice.height; y++) {
                    const cy = y - slice.y;
                    for (let x = slice.x; x < slice.x + slice.width; x++) {
                        const cx = x - slice.x;
                        if (image.pixels[y][x] === i) {
                            doc.rect(cx * pitchPts, cy * pitchPts, pitchPts, pitchPts);
                        }
                    }
                }
                const color = image.partList[i].target;
                doc.fill([color.r, color.g, color.b]);
            }
            done();
        }
    } else if (settings.style === "legend") {
        const layout = getLayout(slices.length, paperWidthPts, paperHeightPts, pageMarginPts, imageCellSizePts.width, imageCellSizePts.height);
        for (const slice of slices) {
            const pos = layout.shift()!;
            const done = pos.next(doc, slice.width * pitchPts, slice.height * pitchPts);
            doc.fontSize(pitchPts);
            doc.font("Courier");
            for (let y = slice.y; y < slice.y + slice.height; y++) {
                const cy = y - slice.y;
                for (let x = slice.x; x < slice.x + slice.width; x++) {
                    const cx = x - slice.x;
                    const px = image.pixels[y][x];
                    if (px === -1) continue;
                    doc.text(image.partList[px].symbol, cx * pitchPts, cy * pitchPts, { align: "center", baseline: "middle", height: pitchPts, width: pitchPts });
                }
            }
            done();
        }
    }

    stream.on("finish", () => {
        window.open(stream.toBlobURL('application/pdf'), '_blank');
    });
    doc.end();
}

function drawLegend(doc: PDFKit.PDFDocument, image: PartListImage) {

    doc.save();
    doc.fontSize(16);
    // Symbol, Color, Count, [Code], Name

    const symbolColumnWidth = 5 + Math.max.apply(Math, image.partList.map(p => doc.widthOfString(p.symbol)));
    const codeColumnWidth = 5 + Math.max.apply(Math, image.partList.map(p => doc.widthOfString(p.target.code ?? "")));
    const countColumnWidth = 5 + Math.max.apply(Math, image.partList.map(p => doc.widthOfString(p.count.toLocaleString())));
    const swatchColumnWidth = 32;
    const nameColumnWidth = 5 + Math.max.apply(Math, image.partList.map(p => doc.widthOfString(p.target.name)));

    const lineMargin = 2;
    const lineHeight = lineMargin * 2 + doc.heightOfString("I like you, person reading this code");

    doc.translate(inchesToPoints(1), inchesToPoints(1));
    let x = 0;
    let y = 0;
    for (let i = 0; i < image.partList.length; i++) {
        x = 0;

        doc.text(image.partList[i].symbol, x, y + lineMargin, { width: symbolColumnWidth, height: lineHeight, align: "center" });
        x += symbolColumnWidth;

        doc.rect(x, y + lineMargin, swatchColumnWidth - 5, lineHeight - lineMargin * 2);
        doc.fill([image.partList[i].target.r, image.partList[i].target.g, image.partList[i].target.b]);
        doc.fillColor("black");
        x += swatchColumnWidth;

        doc.text(image.partList[i].count.toLocaleString(), x, y + lineMargin, { width: countColumnWidth - 5, align: "right" });
        x += countColumnWidth;

        const code = image.partList[i].target.code;
        if (code !== undefined) {
            doc.text(code, x, y + lineMargin, { width: codeColumnWidth });
            x += codeColumnWidth;
        }

        doc.text(image.partList[i].target.name, x, y + lineMargin, { width: nameColumnWidth });
        x += nameColumnWidth;

        doc.moveTo(0, y);
        doc.lineTo(x, y);
        doc.stroke("grey");

        y += lineHeight;
    }

    doc.restore();

    doc.addPage();
}

type StepOptions = {
    image: PartListImage;
    partIndex: number;
    slice: Readonly<{ x: number, y: number, width: number, height: number, row: number, col: number }>;
    doc: PDFKit.PDFDocument;
    pitch: number;
    textPlacement: "side" | "top";
    cellHeaderHeightPts: number;
    multipleSlices: boolean;
    debug: boolean;
};

type Slice = Readonly<{
    image: PartListImage;
    width: number;
    height: number;
    x: number;
    y: number;
    row: number,
    col: number;
}>;

type ImageSlice = Slice & {
    forEach(callback: (x: number, y: number, c: PartListEntry) => void): void;
}

function generateImageSlices(image: PartListImage, size: readonly [number, number]): ReadonlyArray<ImageSlice> {
    const carves1 = carve(image.width, image.height, size[0], size[1]);
    const carves2 = carve(image.width, image.height, size[1], size[0]);
    const carves = carves1.length <= carves2.length ? carves1 : carves2;
    return carves.map(c => ({
        image,
        width: c.width,
        height: c.height,
        x: c.x,
        y: c.y,
        row: c.row,
        col: c.col,
        forEach: makeForEach(image, c.x, c.y, c.width, c.height)
    })).filter(slice => isAnyPixel(slice, p => !!p));
}

type ColorSlice = Slice & Readonly<{
    color: PartListEntry,
    forEach(callback: (x: number, y: number) => void): void;
}>;

function generateColorSlices(slices: ReadonlyArray<Slice>): ReadonlyArray<ColorSlice> {
    const result: ColorSlice[] = [];
    for (const slice of slices) {
        for (const color of slice.image.partList) {
            if (isAnyPixel(slice, p => p === color)) {
                result.push({
                    ...slice,
                    color,
                    forEach: makeForEach(slice.image, slice.x, slice.y, slice.width, slice.height, p => p === color)
                });
            }
        }
    }
    return result;
}

function isAnyPixel(slice: Slice, test: (p: PartListEntry | undefined) => boolean) {
    for (let x = slice.x; x < slice.x + slice.width; x++) {
        for (let y = slice.y; y < slice.y + slice.height; y++) {
            if (test(slice.image.partList[slice.image.pixels[y][x]])) return true;
        }
    }
    return false;
}

function makeForEach(image: PartListImage, x0: number, y0: number, width: number, height: number, test?: (p: PartListEntry) => boolean) {
    return function (callback: (x: number, y: number, c: PartListEntry) => void) {
        for (let x = x0; x < x0 + width; x++) {
            for (let y = y0; y < y0 + height; y++) {
                const p = image.pixels[y][x];
                const color = image.partList[p];
                if (color && (!test || test(color))) {
                    callback(x - x0, y - y0, color);
                }
            }
        }
    }
}

function printSteppedSlice(opts: StepOptions) {
    const {
        image, partIndex, doc, slice, pitch
    } = opts;

    const gridSizePts = {
        width: slice.width * pitch,
        height: slice.height * pitch
    };

    // Print the header
    const text = opts.multipleSlices ?
         `${nameOfColor(image.partList[partIndex].target)} Row ${slice.row} Col ${slice.col}`:
         `${nameOfColor(image.partList[partIndex].target)}`

    if (opts.textPlacement === "side") {
        if (opts.debug) {
            doc.rect(0, 0, gridSizePts.width + opts.cellHeaderHeightPts, gridSizePts.height);
            doc.stroke("blue");
        }

        doc.translate(opts.cellHeaderHeightPts, 0);
        doc.save();
        doc.rotate(-90);
        doc.translate(-gridSizePts.height, 0);
        doc.text(text, 0, 0, { baseline: "bottom", align: "center", width: gridSizePts.height, ellipsis: true });
        doc.restore();
    } else {
        if (opts.debug) {
            doc.rect(0, 0, gridSizePts.width, gridSizePts.height + opts.cellHeaderHeightPts);
            doc.stroke("blue");
        }

        doc.translate(0, opts.cellHeaderHeightPts);
        doc.text(text, 0, 0, { baseline: "bottom", align: "center", width: gridSizePts.width, ellipsis: true });
    }

    // Draw the grid outline
    doc.rect(0, 0, gridSizePts.width, gridSizePts.height);
    doc.lineWidth(1);
    doc.stroke("grey");

    // Fill in the own pixels
    traceOwnPixels();
    // TODO: Here, implement inksaver
    doc.fill("black");

    // Prior-fill outlining
    tracePriorPixels();
    doc.lineWidth(1.3);
    doc.stroke("grey");

    function traceOwnPixels() {
        for (let y = slice.y; y < slice.y + slice.height; y++) {
            const cyPts = (y - slice.y + 0.5) * pitch;
            for (let x = slice.x; x < slice.x + slice.width; x++) {
                if (image.pixels[y][x] === partIndex) {
                    const cxPts = (x - slice.x + 0.5) * pitch;
                    doc.circle(cxPts, cyPts, pitch / 2.5);
                }
            }
        }
    }

    function tracePriorPixels() {
        const alreadyPlotted = new Map<string, true>();
        for (let y = slice.y; y < slice.y + slice.height; y++) {
            outline(slice.x, slice.x + slice.width, x => isPrior(x, y), x => plot(x, y));
        }
        for (let x = slice.x; x < slice.x + slice.width; x++) {
            outline(slice.y, slice.y + slice.height, y => isPrior(x, y), y => plot(x, y));
        }

        function plot(x: number, y: number) {
            // Don't plot duplicates
            const s = x + '-' + y;
            if (alreadyPlotted.has(s)) return;
            alreadyPlotted.set(s, true);

            const cxPts = (x - slice.x) * pitch;
            const cyPts = (y - slice.y) * pitch;
            // Draw an 'x'
            doc.moveTo(cxPts + pitch * 0.3, cyPts + pitch * 0.3);
            doc.lineTo(cxPts + pitch * 0.7, cyPts + pitch * 0.7);
            doc.moveTo(cxPts + pitch * 0.3, cyPts + pitch * 0.7);
            doc.lineTo(cxPts + pitch * 0.7, cyPts + pitch * 0.3);
        }

        function isPrior(x: number, y: number) {
            const px = image.pixels[y][x];
            if (px < partIndex && px !== -1) {
                return true;
            }

            return false;
        }

        function outline(startInclusive: number, endEnclusive: number, callback: (n: number) => boolean, plotter: (n: number) => void) {
            let inside = false;
            for (let i = startInclusive; i < endEnclusive; i++) {
                if (callback(i)) {
                    if (!inside) plotter(i);
                    inside = true;
                } else {
                    if (inside) plotter(i - 1);
                    inside = false;
                }
            }
            if (inside) plotter(endEnclusive - 1);
        }
    }
}

type PageLayout = {
    next(doc: PDFKit.PDFDocument, actualWidthPts: number, actualHeightPts: number): () => void;
};

function getLayout(cellCount: number, pageWidthPts: number, pageHeightPts: number, pageMarginPts: number, cellWidthPts: number, cellHeightPts: number): PageLayout[] {
    const cellMarginPts = mmToPoints(9);
    const result: PageLayout[] = [];

    // Assume there are n = 3 cells with width w
    // arranged on a page of width p (ignoring its outer margin):
    //  |-----------p-------------|
    //  |--w--| m |--w--| m |--w--|
    //  p = w * n + m * (n - 1)
    // Solve for n
    //  n = (m + p) / (m + w)

    const printableWidthPts = pageWidthPts - pageMarginPts * 2;
    const printableHeightPts = pageHeightPts - pageMarginPts * 2;
    // Max rows/cols under non-rotated condition
    const densestUnrotatedLayout = {
        maxCols: Math.floor((cellMarginPts + printableWidthPts) / (cellMarginPts + cellWidthPts)),
        maxRows: Math.floor((cellMarginPts + printableHeightPts) / (cellMarginPts + cellHeightPts))
    };
    // Max rows/cols under rotated condition
    const densestRotatedLayout = {
        maxCols: Math.floor((cellMarginPts + printableWidthPts) / (cellMarginPts + cellHeightPts)),
        maxRows: Math.floor((cellMarginPts + printableHeightPts) / (cellMarginPts + cellWidthPts))
    };

    // Rotate if it means we got more cells per page (and need to)
    const isRotated = densestRotatedLayout.maxRows * densestRotatedLayout.maxCols > densestUnrotatedLayout.maxRows * densestUnrotatedLayout.maxCols && densestUnrotatedLayout.maxRows * densestUnrotatedLayout.maxCols < cellCount;
    const densestLayout = isRotated ? densestRotatedLayout : densestUnrotatedLayout;

    if (densestLayout.maxRows * densestLayout.maxCols === 0) {
        throw new Error("Can't do this layout");
    }

    // If we can use fewer cells because there aren't that many cells to print, do that
    while (true) {
        if (densestLayout.maxCols >= densestLayout.maxRows) {
            if ((densestLayout.maxCols - 1) * densestLayout.maxRows >= cellCount) {
                densestLayout.maxCols--;
                continue;
            }
            if ((densestLayout.maxRows - 1) * densestLayout.maxCols >= cellCount) {
                densestLayout.maxRows--;
                continue;
            }
        } else {
            if ((densestLayout.maxRows - 1) * densestLayout.maxCols >= cellCount) {
                densestLayout.maxRows--;
                continue;
            }
            if ((densestLayout.maxCols - 1) * densestLayout.maxRows >= cellCount) {
                densestLayout.maxCols--;
                continue;
            }
        }
        break;
    }

    const layoutXsize = isRotated ? cellHeightPts : cellWidthPts;
    const layoutYsize = isRotated ? cellWidthPts : cellHeightPts;

    const unallocatedX = pageWidthPts - pageMarginPts * 2 - densestLayout.maxCols * layoutXsize;
    const unallocatedY = pageHeightPts - pageMarginPts * 2 - densestLayout.maxRows * layoutYsize;

    // e.g. if we lay out 3 cells of width 10 on a page of width 45
    // |---A---B---C---|
    // Unallocated space = 45 - (3 * 10) = 15
    // We divide that by 4 (cells + 1)

    const xJustification = unallocatedX / (densestLayout.maxCols + 1);
    const yJustification = unallocatedY / (densestLayout.maxRows + 1);

    const xInterval = layoutXsize + xJustification;
    const yInterval = layoutYsize + yJustification;

    console.log(JSON.stringify({
        pageWidthPts,
        pageHeightPts,
        cellWidthPts,
        cellHeightPts,
        densestUnrotatedLayout,
        densestRotatedLayout,
        isRotated,
        densestLayout,
        unallocatedX,
        unallocatedY,
        xInterval,
        yInterval,
        xJustification,
        yJustification
    }, undefined, 2))

    // Here we could do math to distribute the cells more "evenly" (e.g. putting 13 cells as 5/4/4 instead of 5/5/3),
    // but in practice the last few cells are usually trivially done without a printout, so frontloading
    // pages is the paper-saving choice

    let firstPage = true;
    while (true) {
        let first = true;
        // We need to iterate in row/col or col/row order depending on
        // whether the image is rotated so that it "reads" left-to-right
        // top-to-bottom
        if (isRotated) {
            for (let x = densestLayout.maxCols - 1; x >= 0; x--) {
                for (let y = 0; y < densestLayout.maxRows; y++) {
                    if (iter(x, y, first)) {
                        return result;
                    }
                    first = false;
                }
            }
        } else {
            for (let y = 0; y < densestLayout.maxRows; y++) {
                for (let x = 0; x < densestLayout.maxCols; x++) {
                    if (iter(x, y, first)) {
                        return result;
                    }
                    first = false;
                }
            }
        }
        firstPage = false;
    }

    function iter(x: number, y: number, first: boolean) {
        const newPage = first && !firstPage;
        addCell(newPage,
            pageMarginPts + xJustification + x * xInterval,
            pageMarginPts + yJustification + y * yInterval);

        if (result.length === cellCount) {
            return true;
        }
    }

    function addCell(newPage: boolean, translateX: number, translateY: number) {
        result.push({
            next(doc: PDFKit.PDFDocument, actualWidthPts: number, actualHeightPts: number) {
                if (newPage) {
                    doc.addPage();
                }

                const spareX = layoutXsize - (isRotated ? actualHeightPts : actualWidthPts);
                const spareY = layoutYsize - (isRotated ? actualWidthPts : actualHeightPts);

                doc.save();
                doc.translate(translateX + (spareX / 2), translateY + (spareY / 2));
                if (isRotated) {
                    doc.rotate(90);
                    doc.translate(0, -layoutXsize);
                }

                return () => {
                    doc.restore();
                }
            }
        });
    }
}

function inchesToPoints(inches: number) {
    return inches * 72;
}

function mmToPoints(mm: number) {
    return mm / 25.4 * 72;
}
