import jspdf = require("jspdf");
import zip = require('jszip');
import saver = require('file-saver');
import diff = require('color-diff');
import React = require('react');
import colorConvert = require('color-convert');
import ReactDOM = require('react-dom');
import { rawColorData } from "./color-data";

const symbolAlphabet = "ABCDEFGHJKLMNPQRSTVXZαβΔθλπΦΨΩabcdefghijklmnopqrstuvwxyz0123456789";

const refObjs = {
    quarter: {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/44/2014_ATB_Quarter_Obv.png",
        width: 24.26,
        height: 24.26
    },
    dollar: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg",
        width: 156.1,
        height: 66.3
    },
    credit: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/23/CIDSampleAmex.png",
        width: 85.60,
        height: 53.98
    }
};

/**
 * Pitch is the center-to-center distance between pegs (in mm). This is
 * slightly larger than the actual bead diameter, so needs to be measured
 * manually.
 */
const pitchInfo = {
    // Measured from 50 pegs @ 138mm (138/(50-1))
    mini: 2.816,
    // TODO: Best guess; need actual
    perler: 5.1,
    // https://orionrobots.co.uk/wiki/lego_specifications.html
    lego: 8
};

type ObjectColor = {
    name: string,
    code: string,
    r: number, g: number, b: number,
    R: number, G: number, B: number
};

const colorData: ObjectColor[] = rawColorData.split(/\r?\n/g).map(line => {
    const parts = line.split('\t');
    return ({
        name: parts[4],
        code: parts[2],
        r: +parts[6],
        g: +parts[7],
        b: +parts[8],
        R: +parts[6],
        G: +parts[7],
        B: +parts[8]
    });
});

const artkalStarterCodes =
    ("CT1,C01,C88,C33,C34,C02," +
        "C51,C47,C23,C31,C32,C78," +
        "C22,C44,C07,C09,C05,C57," +
        "C50,C25,C26,C52,C27,C64," +
        "C10,C42,C48,C03,C04,C17," +
        "C12,C13,C14,C86,C15,C70," +
        "C39,C60,C79,C54,C81,C82," +
        "C68,C19,C38,C20,C37,C21").split(",");

function app() {
    let last: ReturnType<typeof renderWorker> = null!;

    const planSettingsComp = createPlannerSettingsComponent(render);
    ReactDOM.render(planSettingsComp.component(), document.getElementById("plan-settings") as HTMLDivElement);

    const displaySettingsComp = createDisplaySettingsComponent(render);
    ReactDOM.render(displaySettingsComp.component(), document.getElementById("display-settings") as HTMLDivElement);

    const downloadBar = createDownloadBar(download);
    ReactDOM.render(downloadBar.component(), document.getElementById("download") as HTMLDivElement);

    const myImg = document.getElementById("myImg") as HTMLImageElement;
    const enc = window.localStorage.getItem("saved-image");
    if (enc) {
        myImg.src = enc;
        myImg.onload = function () {
            render();
        };
    }
    const planSvg = document.getElementById("plan") as any as SVGElement;

    listenForImagePastes(src => {
        saveObjectUrlToLocalStorage(src, "saved-image");

        myImg.src = src;
    });

    function download(kind: string) {
        switch (kind) {
            case "svg":
                const blob = new Blob([document.getElementById("plan")!.outerHTML], { type: "image/svg;charset=utf-8" });
                saver.saveAs(blob, "plan.svg");
                break;

            case "png-96":
                makePng(96);
                break;

            case "png-100":
                makePng(100);
                break;

            case "pdf":
                makePdf(downloadBar.getOptions());
                break;
        }

        function makePdf(printOptions: PrintOptions) {
            const img: PalettizedImage = last.quantized;
            let pitch = getPitch(last.planSettings.size);
            // Correction for my shitty printer?
            pitch = pitch * 100 / 96;

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
                width: pitch * Math.min(img.width, printOptions.carveSize[0]),
                height: pitch * Math.min(img.height, printOptions.carveSize[1])
            };

            // Actual padded size of a cell
            const cellSize = {
                width: gridSize.width + gridMargin * 2,
                height: gridSize.height + textHeight + gridMargin * 2
            };

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
            } else {
                pageWidth = cellSize.width;
                pageHeight = cellSize.height;
                orientation = cellSize.width > cellSize.height ? "landscape" : "portrait"
            }

            const printableAreaSize = {
                width: pageWidth - pageMargins.left - pageMargins.right,
                height: pageHeight - pageMargins.bottom - pageMargins.top
            };

            // New PDF
            const doc = new jspdf.jsPDF({
                unit: "mm",
                format: [pageWidth, pageHeight],
                orientation
            });

            const cols = Math.floor(printableAreaSize.width / cellSize.width);
            const rows = Math.floor(printableAreaSize.height / cellSize.height);
            let rowCursor = 0, colCursor = -1;

            doc.setFont("Helvetica");
            doc.setFontSize(7);
            doc.setFillColor(0, 0, 0);

            const slices = carve(img.width, img.height, printOptions.carveSize[0], printOptions.carveSize[1]);
            if (slices.length > 1) {
                // Print slice diagram
                doc.addPage();
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
            }

            const ctx = doc.context2d;
            // Print each color in order
            for (let i = 0; i < last.partList.length; i++) {
                // Print each slice
                for (let si = 0; si < slices.length; si++) {
                    // Skip any slices with zero pixels to lay down
                    const slice = slices[si];
                    let realCount = 0;
                    for (let y = slice.y; y < slice.y + slice.height; y++) {
                        for (let x = slice.x; x < slice.x + slice.width; x++) {
                            if (img.pixels[y][x] === last.partList[i].target) {
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
                        ctx.fillText(`Cell ${symbolAlphabet[si]}: ${last.partList[i].target.code} (${last.partList[i].target.name}) × ${realCount}`, 0, 0);
                    } else {
                        ctx.fillText(`${last.partList[i].target.code} (${last.partList[i].target.name}) × ${realCount}`, 0, 0);
                    }
                    ctx.translate(0, textHeight);
                    ctx.lineWidth = 0.01;
                    ctx.strokeStyle = "grey";
                    ctx.strokeRect(0, 0, gridSize.width, gridSize.height);
                    for (let y = slice.y; y < slice.y + slice.height; y++) {
                        for (let x = slice.x; x < slice.x + slice.width; x++) {
                            if (img.pixels[y][x] === last.partList[i].target) {
                                ctx.fillRect((x - slice.x) * pitch, (y - slice.y) * pitch, pitch, pitch);
                            } else {
                                for (let j = 0; j < i; j++) {
                                    if (img.pixels[y][x] === last.partList[j].target) {
                                        ctx.fillRect((x - slice.x + 0.4) * pitch, (y - slice.y + 0.4) * pitch, pitch * 0.2, pitch * 0.2);
                                    }
                                }
                            }
                        }
                    }
                    ctx.restore();
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

        function makePng(ppi: number) {
            // Pixels per millimeter
            const ppmm = ppi / 25.4;
            // Millimeters per bead
            const pitch = getPitch(last.planSettings.size);

            const pixelsPerBead = ppmm * pitch;

            // quantized
            const img: PalettizedImage = last.quantized;

            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            canvas.width = pixelsPerBead * img.width + 6;
            canvas.height = pixelsPerBead * img.height + 6 + 32;

            const ctx = canvas.getContext("2d")!;
            ctx.translate(3, 3);
            ctx.strokeStyle = "1px solid black";
            ctx.strokeRect(0, 0, img.width * pixelsPerBead, img.height * pixelsPerBead);
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    if (img.pixels[y][x] === last.partList[0].target) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(x * pixelsPerBead, y * pixelsPerBead, pixelsPerBead, pixelsPerBead);
                    }
                }
            }
            ctx.translate(-3, -3);
            ctx.font = "32px Calibri";
            ctx.fillText(`${last.partList[0].target.code} (${last.partList[0].target.name}) x ${last.partList[0].count} (1 / 14)`, 14, img.height * pixelsPerBead + ppi / 2);

            const link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.toDataURL()
            link.click();
        }
    }

    function render() {
        last = renderWorker();
    }

    function renderWorker() {
        const { mark } = timer();

        const displaySettings = displaySettingsComp.value();
        const planSettings = planSettingsComp.value();
        const imageData = getImageData(myImg);
        mark("Get image data");
        const uncroppedRgbaArray = imageDataToRgbaArray(imageData);
        mark("Image -> RGBA");

        let transparency;
        switch (planSettings.transparency) {
            case "auto":
                mark("Infer transparency");
                transparency = inferTransparencyValue(uncroppedRgbaArray);
                break;
            case "alpha":
                transparency = -1;
                break;
            case "none":
                transparency = NaN;
                break;
            case "magenta":
                transparency = 0xFF00FF;
                break;
            case "corners":
                transparency = getCornerTransparency(uncroppedRgbaArray);
                break;
        }

        const rgbaArray = applyTransparencyAndCrop(uncroppedRgbaArray, transparency);
        mark("Apply transparency & crop");

        applyImageAdjustments(rgbaArray, planSettings.brightness, planSettings.contrast, planSettings.saturation);
        mark("Adjust image");

        let allowedColors;
        switch (planSettings.palette) {
            case "artkal-all-mini":
                allowedColors = colorData.filter(c => c.code.startsWith("C"));
                break;
            case "artkal-mini-starter":
                allowedColors = colorData.filter(c => artkalStarterCodes.includes(c.code));
                break;
            case "all":
                allowedColors = undefined;
                break;
            default:
                allowedColors = colorData;
                break;
        }
        const palette = makePalette(rgbaArray, allowedColors, planSettings);
        mark("Create palette");

        const quantized = palettize(rgbaArray, palette);
        mark("Apply palette");

        const partList = getPartList(palette);
        mark("Get part list");

        renderPlan(planSvg, quantized, partList, planSettings, displaySettings);
        mark("Render plan");

        showPartList(partList);
        mark("Render part list");

        return {
            palette,
            quantized,
            partList,
            planSettings,
            displaySettings
        };
    }
}

function carve(width: number, height: number, xSize: number, ySize: number): { x: number, y: number, width: number, height: number }[] {
    const res = [];
    const xa = carveAxis(width, xSize);
    const ya = carveAxis(height, ySize);
    let cy = 0;
    for (const y of ya) {
        let cx = 0;
        for (const x of xa) {
            res.push({
                x: cx,
                y: cy,
                width: x,
                height: y
            });
            cx += x;
        }
        cy += y;
    }
    return res;
}

function carveAxis(width: number, size: number) {
    if (width <= size) return [width];
    if (width <= size * 2) {
        return [Math.ceil(width / 2), Math.floor(width / 2)];
    }
    const remainder = width % size;

    let res = [remainder];
    let remaining = width - res[0];
    while (remaining > size) {
        res.push(size);
        remaining -= size;
    }
    res.push(remaining);
    return res;

}

function getPitch(size: PlanSettings["size"]) {
    return pitchInfo[size];
}

function saveObjectUrlToLocalStorage(src: string, key: string) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const enc = canvas.toDataURL('image/png');
        window.localStorage.setItem(key, enc);
    };
    img.src = src;
}

function listenForImagePastes(callback: (src: string) => void) {
    window.addEventListener("paste", function (evt) {
        const e = evt as ClipboardEvent;
        for (const item of e.clipboardData?.items ?? []) {
            if (item.type.indexOf("image") !== -1) {
                var blob = item.getAsFile();
                var source = URL.createObjectURL(blob);
                callback(source);
            }
        }
    });
}

function showPartList(partList: PartListEntry[]) {
    ReactDOM.render(<table className="part-list">
        <tr>
            <th colSpan={5} className="top-header">Legend</th>
        </tr>
        {partList.map(ent => {
            return <tr>
                <td className="legend-symbol">{ent.symbol}</td>
                <td className="part-count">{ent.count.toLocaleString()}</td>
                <td className="color-code">{ent.target.code}</td>
                <td style={{ color: colorEntryToHex(ent.target) }}>⬤</td>
                <td><span className="colorName">{ent.target.name}</span></td>
            </tr>
        }) as any}
    </table>, document.getElementById("legend")!)
}

function getImageData(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    return imageData;
}

function renderPlan(svg: SVGElement, quantized: PalettizedImage, partList: PartListEntry[], planSettings: PlanSettings, displaySettings: DisplaySettings) {
    const svgns = "http://www.w3.org/2000/svg";

    const colorLayer = document.getElementById("layer-colors")!;
    const gridLayer = document.getElementById("layer-grid")!;
    const textLayer = document.getElementById("layer-text")!;
    const refobjLayer = document.getElementById("layer-refobj")!;
    document.getElementById("plan-background")?.setAttribute("fill", displaySettings.background);
    svg.removeChild(colorLayer);
    svg.removeChild(gridLayer);
    svg.removeChild(textLayer);
    svg.removeChild(refobjLayer);
    clearChildren(colorLayer);
    clearChildren(gridLayer);
    clearChildren(textLayer);
    clearChildren(refobjLayer);

    const isBackgroundDark = displaySettings.background === "#000" || displaySettings.background === "#555";

    // Color Cells
    if (displaySettings.shaping !== "none") {
        for (let y = 0; y < quantized.height; y++) {
            for (let x = 0; x < quantized.width; x++) {
                const r = document.createElementNS(svgns, "use");
                r.setAttribute("href", "#" + displaySettings.shaping);
                r.setAttribute("x", x * 32);
                r.setAttribute("y", y * 32);
                const pixel = quantized.pixels[y][x];
                if (pixel === undefined) {
                    r.setAttribute("fill", "transparent");
                } else {
                    r.setAttribute("fill", colorEntryToHtml(pixel));
                }
                colorLayer.appendChild(r);
            }
        }
    }

    // Symbols
    if (displaySettings.planStyle === "symbols") {
        for (let y = 0; y < quantized.height; y++) {
            for (let x = 0; x < quantized.width; x++) {
                const px = quantized.pixels[y][x];
                if (px === undefined) continue;

                const t = document.createElementNS(svgns, "text");
                t.innerHTML = partList.filter(p => p.target === px)[0].symbol;
                t.setAttribute("x", (x + 0.5) * 32);
                t.setAttribute("y", (y + 0.8) * 32);
                t.setAttribute("text-anchor", "middle");
                if (displaySettings.shaping === "none") {
                    t.setAttribute("class", isBackgroundDark ? "dark" : "bright");
                } else {
                    if (isBright(px)) {
                        t.setAttribute("class", "bright");
                    } else {
                        t.setAttribute("class", "dark");
                    }
                }
                textLayer.appendChild(t);
            }
        }
    }

    // Spans
    if (displaySettings.planStyle === "spans" || displaySettings.planStyle === "symbolspans") {
        for (let y = 0; y < quantized.height; y++) {
            let nowColor = undefined;
            let runCount = 0;
            for (let x = 0; x <= quantized.width; x++) {
                const px = quantized.pixels[y][x];
                // Running labels
                if (nowColor === px) {
                    runCount++;
                } else {
                    if (runCount > 0) {
                        addAt(nowColor, runCount, x, y)
                    }
                    nowColor = px;
                    runCount = 1;
                }

                if (x === quantized.width) break;
            }
        }

        function addAt(px: ObjectColor | undefined, runCount: number, endX: number, y: number) {
            if (displaySettings.planStyle === "spans") {
                if (runCount < 2) return;
            } else {
                if (px === undefined) return;
            }

            const t = document.createElementNS(svgns, "text");
            if (displaySettings.planStyle === "spans") {
                t.innerHTML = runCount.toString();
            } else {
                const sym = partList.filter(p => p.target === px)[0].symbol;
                if (runCount === 1) {
                    t.innerHTML = sym;
                } else if (runCount === 2) {
                    t.innerHTML = `${sym}`;
                } else {
                    t.innerHTML = `${sym}×${runCount.toString()}`;
                }
            }

            t.setAttribute("x", ((endX - runCount / 2) * 32).toString());
            t.setAttribute("y", ((y + 0.8) * 32).toString());
            t.setAttribute("text-anchor", "middle");
            if (displaySettings.shaping === "none") {
                t.setAttribute("class", isBackgroundDark ? "dark" : "bright");
            } else {
                if (px === undefined || isBright(px)) {
                    t.setAttribute("class", "bright");
                } else {
                    t.setAttribute("class", "dark");
                }
            }
            textLayer.appendChild(t);
        }
    }

    // Grid lines
    if (displaySettings.grid !== "none") {
        const gridInterval = +displaySettings.grid;
        for (let y = 1; y < quantized.height; y++) {
            const line = document.createElementNS(svgns, "line");
            line.classList.add("gridline");
            line.classList.add(y % gridInterval === 0 ? "gridmajor" : "gridminor");
            line.setAttribute("x1", 2);
            line.setAttribute("x2", quantized.width * 32 - 4);
            line.setAttribute("y1", y * 32);
            line.setAttribute("y2", y * 32);
            gridLayer.appendChild(line);
        }
        for (let x = 1; x < quantized.width; x++) {
            const line = document.createElementNS(svgns, "line");
            line.classList.add(x % gridInterval === 0 ? "gridmajor" : "gridminor");
            line.setAttribute("x1", x * 32);
            line.setAttribute("x2", x * 32);
            line.setAttribute("y1", 2);
            line.setAttribute("y2", quantized.height * 32 - 4);
            gridLayer.appendChild(line);
        }
    }

    // Reference object
    if (displaySettings.refobj !== "none") {
        const factor = 32 / getPitch(planSettings.size);
        const img = document.createElementNS(svgns, "image");
        const refObj = refObjs[displaySettings.refobj];
        img.setAttribute("href", refObj.url);
        img.setAttribute("width", refObj.width * factor);
        img.setAttribute("height", refObj.height * factor);
        img.setAttribute("opacity", 0.8);
        img.setAttribute("x", quantized.width * 32 - refObj.width * factor);
        img.setAttribute("y", quantized.height * 32 - refObj.height * factor);
        refobjLayer.appendChild(img);
    }

    svg.setAttribute("viewBox", `0 0 ${quantized.width * 32} ${quantized.height * 32}`);
    svg.appendChild(gridLayer);
    svg.appendChild(colorLayer);
    svg.appendChild(textLayer);
    svg.appendChild(refobjLayer);

    function clearChildren(el: HTMLElement) {
        // while (el.children.length) el.removeChild(el.children[0]);
        el.innerHTML = "";
    }
}

interface PlanSettings {
    brightness: number;
    contrast: number;
    saturation: number;
    colormatch: "CIEDE2000" | "rgb";
    nodupes: boolean;
    transparency: (typeof PlanSettings)["transparency"][number][0];
    palette: (typeof PlanSettings)["palette"][number][0];
    size: (typeof PlanSettings)["size"][number][0];
}

const PlanSettings = {
    transparency: [
        ["auto", "Auto"],
        ["alpha", "Alpha Channel"],
        ["magenta", "Magenta"],
        ["corners", "Corners"],
        ["none", "None"]
    ],
    palette: [
        ["artkal-mini-starter", "Artkal Mini Starter Set"],
        ["artkal-all-mini", "All Artkal Mini"],
        // ["perler-all", "All Perler"],
        // ["webcolors", "Web Colors"],
        ["all", "All Colors"]
    ],
    size: [
        ["mini", "Mini"],
        ["perler", "Standard"],
        ["lego", "LEGO ™"]
    ]
} as const;

function createPlannerSettingsComponent(firedChanged: () => void) {
    return ({
        component,
        value
    });

    function changed() {
        firedChanged();
    }

    function value() {
        const p = new FormData(document.getElementById("plan-settings-form") as HTMLFormElement);
        const entries = [...p.entries()];
        return Object.fromEntries(entries) as any as PlanSettings;
    }

    function component() {
        return <form id="plan-settings-form">
            <div className="options-group">
                <img id="myImg" />
            </div>
            <div className="options-group">
                <span className="header">Transparency</span>
                {radioGroup("transparency", changed, "auto", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Adjustments</span>
                <label><input type="range" onChange={changed} min="-10" max="10" defaultValue="0" step="1" name="brightness" />Brightness</label>
                <label><input type="range" onChange={changed} min="-10" max="10" defaultValue="0" step="1" name="contrast" />Contrast</label>
                <label><input type="range" onChange={changed} min="-10" max="10" defaultValue="0" step="1" name="saturation" />Saturation</label>
            </div>

            <div className="options-group">
                <span className="header">Color Matching</span>
                <label><input type="radio" onChange={changed} name="colormatch" value="CIEDE2000" defaultChecked />CIEDE200</label>
                <label><input type="radio" onChange={changed} name="colormatch" value="rgb" />RGB</label>
                <label><input type="checkbox" onChange={changed} id="nodupes" />No Duplicates</label>
            </div>

            <div className="options-group">
                <span className="header">Palette</span>
                {radioGroup("palette", changed, "artkal-mini-starter", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Pixel Size</span>
                {radioGroup("size", changed, "mini", PlanSettings)}
            </div>
        </form>;
    }
}


const DisplaySettings = {
    planStyle: [
        ["symbolspans", "Symbols + Spans"],
        ["spans", "Spans"],
        ["symbols", "Symbols"],
        ["none", "None"],
    ],
    grid: [
        ["50", "50"],
        ["29", "29"],
        ["28", "28"],
        ["10", "10"],
        ["none", "None"]
    ],
    background: [
        ["#555", "Grey"],
        ["#000", "Black"],
        ["#FFF", "White"],
        ["transparent", "Transparent"],
        ["url(#wood)", "Wood"]
    ],
    shaping: [
        ["melted", "Melted"],
        ["square", "Square"],
        ["circle", "Circle"],
        ["none", "None"]
    ],
    refobj: [
        ["none", "None"],
        ["quarter", "Quarter"],
        ["dollar", "Dollar"],
        ["credit", "Bank Card"]
    ]
} as const;
type RadioSettings<T extends Record<string, readonly (readonly [unknown, string])[]>> = {
    [K in keyof T & string]: T[K][number][0]
};

interface DisplaySettings extends RadioSettings<typeof DisplaySettings> {
}

function createDisplaySettingsComponent(onChange: () => void) {
    return ({
        component,
        value
    });

    function changed() {
        onChange();
    }

    function value() {
        const p = new FormData(document.getElementById("displaysettingsform") as HTMLFormElement);
        const entries = [...p.entries()];
        return Object.fromEntries(entries) as any as DisplaySettings;
    }

    function component() {
        return <form id="displaysettingsform">
            <div className="options-group">
                <span className="header">Legend</span>
                {radioGroup("planStyle", changed, "symbolspans", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Shape</span>
                {radioGroup("shaping", changed, "melted", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Grid</span>
                {radioGroup("grid", changed, "50", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Background</span>
                {radioGroup("background", changed, "#555", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Comparison</span>
                {radioGroup("refobj", changed, "none", DisplaySettings)}
            </div>
        </form>;
    }
}

interface PrintOptions {
    paperSize: "fit" | "A4" | "letter";
    carveSize: [number, number];
}
function createDownloadBar(onRequest: (kind: string) => void) {
    return ({
        component,
        getOptions
    });

    function getOptions(): PrintOptions {
        return {
            paperSize: "letter",
            carveSize: [50, 50]
        };
    }

    function download(s: string) {
        return function (e: any) {
            e.preventDefault();
            onRequest(s);
        }
    }

    function component() {
        return <form>
            <div className="options-group">
                <span className="header">Plan Images</span>
                <label><a href="#" onClick={download("svg")}>SVG</a></label>
                <label><a href="#" onClick={download("txt")}>Text</a></label>
                <label><a href="#" onClick={download("png")}>PNG</a></label>
            </div>

            <div className="options-group">
                <span className="header">Printable Underlay</span>
                <label><input type="checkbox" id="dpi-correct" />Correct for 100/96 DPI</label>
                <label><a href="#" onClick={download("pdf")}>Get PDF</a></label>
            </div>
        </form>;
    }
}

window.addEventListener("DOMContentLoaded", function () {
    app();
});

type PartListEntry = {
    target: ObjectColor,
    symbol: string,
    count: number
};
function getPartList(palette: InputColorsToObjectColors): PartListEntry[] {
    const res = [];
    for (const ent of palette) {
        const extant = res.filter(e => e.target === ent.target)[0];
        if (extant) {
            extant.count += ent.count;
        } else {
            res.push({ count: ent.count, target: ent.target, symbol: "#" });
        }
    }

    res.sort((a, b) => b.count - a.count);
    // Assign symbols
    for (let i = 0; i < res.length; i++) {
        res[i].symbol = symbolAlphabet[i];
    }
    return res;
}

type PalettizedImage = {
    pixels: (ObjectColor | undefined)[][];
    width: number;
    height: number;
}
function palettize(rgbaArray: RgbaImage, palette: InputColorsToObjectColors): PalettizedImage {
    const pixels = [];
    for (let y = 0; y < rgbaArray.height; y++) {
        const row = [];
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                row.push(undefined);
            } else {
                const paletteEntry = palette.filter(p => p.color === rgbaArray.pixels[y][x])[0];
                row.push(paletteEntry.target);
            }
        }
        pixels.push(row);
    }

    return {
        pixels,
        width: rgbaArray.width,
        height: rgbaArray.height
    };
}

type RgbaImage = {
    pixels: number[][],
    width: number,
    height: number;
}
function imageDataToRgbaArray(imageData: ImageData): RgbaImage {
    const raw = [];
    for (let y = 0; y < imageData.height; y++) {
        const row = [];
        for (let x = 0; x < imageData.width; x++) {
            const b = 4 * (y * imageData.width + x);
            if (imageData.data[b + 3] === 255) {
                row.push((imageData.data[b + 2] << 16) + (imageData.data[b + 1] << 8) + imageData.data[b]);
            } else {
                row.push(-1);
            }
        }
        raw.push(row);
    }

    return {
        pixels: raw,
        width: imageData.width,
        height: imageData.height
    };
}

function applyImageAdjustments(rgbaArray: RgbaImage, brightness: number, contrast: number, saturation: number) {
    if ((brightness === 0) && (contrast === 0) && (saturation === 0)) return;
    const data = rgbaArray.pixels;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const p = data[y][x];
            if (p === -1) continue;
            const hsv = colorConvert.rgb.hsv(p & 0xFF, (p >> 8) & 0xFF, (p >> 16) & 0xFF);
            // Contrast
            if (contrast > 0) {
                hsv[2] = clamp(0, ((hsv[2] - 50) * (1 + (contrast / 7)) + 50), 100);
            } else if (contrast < 0) {
                hsv[2] = clamp(0, ((hsv[2] - 50) * (1 + (contrast / 10)) + 50), 100);
            }
            // Saturation
            hsv[1] = clamp(0, hsv[1] + saturation * 5, 100);
            // Brightness
            hsv[2] = clamp(0, hsv[2] + brightness * 5, 100);
            const rgb = colorConvert.hsv.rgb(hsv);
            data[y][x] = (rgb[0] | 0) | (rgb[1] << 8) | (rgb[2] << 16);
        }
    }
}

function clamp(min: number, v: number, max: number) {
    return Math.max(min, Math.min(v, max));
}

function applyTransparencyAndCrop(rgbaArray: RgbaImage, transparentValue: number): RgbaImage {
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] !== transparentValue) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const pixels = [];
    for (let y = minY; y <= maxY; y++) {
        const row = [];
        for (let x = minX; x <= maxX; x++) {
            const v = rgbaArray.pixels[y][x];
            if (v === transparentValue) {
                row.push(-1);
            } else {
                row.push(v);
            }
        }
        pixels.push(row);
    }

    return {
        pixels,
        width: maxX - minX + 1,
        height: maxY - minY + 1
    };
}

function inferTransparencyValue(rgbaArray: RgbaImage): number {
    let hasMagenta = false;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                // If there's any true transparency, that's it
                return -1;
            }
            const rv = rgbaArray.pixels[y][x];

            // Magenta check
            hasMagenta = hasMagenta || rv === 0xFF00FF;
        }
    }
    if (hasMagenta) return 0xFF00FF;

    // Otherwise use the median color from the corners
    return getCornerTransparency(rgbaArray);
}

function getCornerTransparency(rgbaArray: RgbaImage): number {
    const arr = [
        rgbaArray.pixels[0][0],
        rgbaArray.pixels[rgbaArray.height - 1][0],
        rgbaArray.pixels[rgbaArray.height - 1][rgbaArray.width - 1],
        rgbaArray.pixels[0][rgbaArray.width - 1]];
    arr.sort();
    return arr[2];
}

type InputColorsToObjectColors = ColorAssignment[];
type ColorAssignment = {
    color: number,
    target: ObjectColor,
    count: number
};

function makePalette(rgbaArray: RgbaImage, allowedColors: ObjectColor[] | undefined, settings: PlanSettings): ColorAssignment[] {
    const tempAssignments: ColorAssignment[] = [];
    const inputColors = [];

    // Collect all colors that need assignment
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const color = rgbaArray.pixels[y][x];
            // Skip transparent
            if (color === -1) continue;
            const extant = inputColors.filter(r => r.color === color)[0];
            if (extant) {
                extant.count++;
            } else {
                inputColors.push({
                    color,
                    count: 1,
                    r: color & 0xFF,
                    g: (color >> 8) & 0xFF,
                    b: (color >> 16) & 0xFF
                });
            }
        }
    }

    // Sort by most-common colors
    inputColors.sort((a, b) => b.count - a.count);

    const diff = colorDiff[settings.colormatch];
    // Assign each in turn
    for (const r of inputColors) {
        if (allowedColors === undefined) {
            let R = r.color & 0xFF,
                G = (r.color >> 8) & 0xFF,
                B = (r.color >> 16) & 0xFF;

            tempAssignments.push({
                color: r.color,
                target: {
                    R, G, B,
                    r: R, g: G, b: B,
                    name: colorEntryToHex({ r: R, g: G, b: B }),
                    code: ''
                },
                count: r.count
            });
        } else {
            let bestTarget = undefined;
            let bestScore = Infinity;
            for (const c of allowedColors) {
                if (settings.nodupes) {
                    if (tempAssignments.some(t => t.target === c)) continue;
                }

                const score = diff(r, c);
                if (score < bestScore) {
                    bestTarget = c;
                    bestScore = score;
                }
            }
            if (bestTarget === undefined) throw new Error("impossible");

            tempAssignments.push({
                color: r.color,
                target: bestTarget,
                count: r.count,
            });
        }
    }

    return tempAssignments;
}

const colorDiff = {
    rgb: (lhs: Rgb, rhs: Rgb) => {
        return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    "CIEDE2000": (lhs: Rgb, rhs: Rgb) => {
        return diff.diff(diff.rgb_to_lab({ R: lhs.r, G: lhs.g, B: lhs.b }), diff.rgb_to_lab({ R: rhs.r, G: rhs.g, B: rhs.b }));
    }
};

function renderRgbaImageToCanvas(quantized: RgbaImage, target: HTMLCanvasElement) {
    target.width = quantized.width;
    target.height = quantized.height;
    const ctx = target.getContext('2d')!;
    const data = ctx.getImageData(0, 0, quantized.width, quantized.height);
    for (let y = 0; y < quantized.height; y++) {
        for (let x = 0; x < quantized.width; x++) {
            const j = (quantized.width * y + x) * 4;
            const p = quantized.pixels[y][x];
            if (p === -1) {
                data.data[j + 3] = 0;
            } else {
                data.data[j + 0] = p & 0xFF;
                data.data[j + 1] = (p >> 8) & 0xFF;
                data.data[j + 2] = (p >> 16) & 0xFF;
                data.data[j + 3] = 255;
            }
        }
    }
    ctx.putImageData(data, 0, 0);
}

function renderPalettizedImageToCanvas(quantized: PalettizedImage, target: HTMLCanvasElement) {
    target.width = quantized.width;
    target.height = quantized.height;
    const ctx = target.getContext('2d')!;
    const data = ctx.getImageData(0, 0, quantized.width, quantized.height);
    for (let y = 0; y < quantized.height; y++) {
        for (let x = 0; x < quantized.width; x++) {
            const j = (quantized.width * y + x) * 4;
            const p = quantized.pixels[y][x];
            if (p === undefined) {
                data.data[j + 3] = 0;
            } else {
                data.data[j + 0] = p.r;
                data.data[j + 1] = p.g;
                data.data[j + 2] = p.b;
                data.data[j + 3] = 255;
            }
        }
    }
    ctx.putImageData(data, 0, 0);
}

function rgbToRGB(rgb: Rgb): diff.RGBColor {
    return {
        R: rgb.r,
        G: rgb.g,
        B: rgb.b
    };
}

function rawToHtml(i: number) {
    return "rgb(" + (i & 0xFF) + "," + ((i >> 8) & 0xFF) + "," + ((i >> 16) & 0xFF) + ")";
}

function colorEntryToHtml(c: Rgb) {
    return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
}

function colorEntryToHex(c: Rgb) {
    return "#" + hx(c.r) + hx(c.g) + hx(c.b);
}

function hx(n: number) {
    if (n === undefined) return "";
    if (n === 0) return "00";
    if (n < 16) return "0" + n.toString(16);
    return n.toString(16);
}

function isBright(i: Rgb) {
    return i.r + i.g * 1.4 + i.b > 460;
}

function timer() {
    let last = Date.now();

    return { mark };

    function mark(event: string) {
        const n = Date.now();
        // console.log(`PERF: '${event}' finished in ${n - last}ms`);
        last = n;
    }
}

declare global {
    export interface Element {
        setAttribute(name: string, value: number): void;
    }
}

type Rgb = { r: number, g: number, b: number };

function radioGroup<K extends string, V extends Record<K, readonly (readonly [string | number, unknown])[]>>(name: K, changed: () => void, defaultValue: V[K][number][0], values: V) {
    const v = values[name];
    return <>
        {...v.map(([value, caption]) => {
            return <label key={value}><input type="radio" onChange={changed} name={name} value={value} defaultChecked={value === defaultValue} />{caption}</label>;
        }
        )}
    </>;
}
