"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saver = require("file-saver");
const preact = require("preact");
const color_data_1 = require("./color-data");
const display_settings_1 = require("./display-settings");
const download_bar_1 = require("./download-bar");
const gallery_1 = require("./gallery");
const image_utils_1 = require("./image-utils");
const palettizer_1 = require("./palettizer");
const pdf_generator_1 = require("./pdf-generator");
const plan_settings_1 = require("./plan-settings");
const utils_1 = require("./utils");
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
const colorData = color_data_1.rawColorData.split(/\r?\n/g).map(line => {
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
const artkalStarterCodes = ("CT1,C01,C88,C33,C34,C02," +
    "C51,C47,C23,C31,C32,C78," +
    "C22,C44,C07,C09,C05,C57," +
    "C50,C25,C26,C52,C27,C64," +
    "C10,C42,C48,C03,C04,C17," +
    "C12,C13,C14,C86,C15,C70," +
    "C39,C60,C79,C54,C81,C82," +
    "C68,C19,C38,C20,C37,C21").split(",");
function app() {
    let last = null;
    const planSettingsComp = (0, plan_settings_1.createPlannerSettingsComponent)(render);
    preact.render(planSettingsComp.component(), document.getElementById("plan-settings"));
    const displaySettingsComp = (0, display_settings_1.createDisplaySettingsComponent)(render);
    preact.render(displaySettingsComp.component(), document.getElementById("display-settings"));
    const downloadBar = (0, download_bar_1.createDownloadBar)(download);
    preact.render(downloadBar.component(), document.getElementById("print-settings"));
    const gallery = [...predefinedGallery];
    for (let i = 0; i < 100; i++) {
        const e = window.localStorage.getItem(keyFormat(i));
        if (e !== null) {
            gallery.push(e);
        }
    }
    renderGallery();
    setupDropbox();
    const myImg = document.getElementById("myImg");
    myImg.onload = function () {
        render();
    };
    const gi = +window.localStorage.getItem("gallery-index");
    if (gallery[gi]) {
        myImg.src = gallery[gi];
    }
    else {
        myImg.src = gallery[gallery.length - 1];
    }
    const planSvg = document.getElementById("plan");
    listenForImagePastes(src => {
        acceptUserImage(src);
    });
    function setupDropbox() {
        const dropbox = document.getElementById("drop-target");
        dropbox.addEventListener("dragenter", e => (e.stopPropagation(), e.preventDefault()), false);
        dropbox.addEventListener("dragover", e => (e.stopPropagation(), e.preventDefault()), false);
        dropbox.addEventListener("drop", function (e) {
            var _a;
            e.stopPropagation();
            e.preventDefault();
            const files = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (!files)
                return;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/'))
                    continue;
                const reader = new FileReader();
                reader.onload = (img) => {
                    acceptUserImage(img.target.result);
                };
                reader.readAsDataURL(file);
            }
        }, false);
    }
    function download(name, opts) {
        switch (name) {
            case "calibration":
                (0, pdf_generator_1.makeTestSheet)();
                break;
            case "pdf":
                (0, pdf_generator_1.makePdf)(last.partListImage, last.planSettings, opts);
                break;
            default:
                throw new Error(name);
        }
    }
    function render() {
        last = renderWorker();
    }
    function renderWorker() {
        const planSettings = planSettingsComp.value();
        const imageData = (0, image_utils_1.getImageData)(myImg);
        const { palette, quantized, rgbaArray } = processImage(imageData, planSettings);
        const displaySettings = displaySettingsComp.value();
        const pli = createPartListImage(palette, quantized);
        renderPlan(planSvg, pli, planSettings, displaySettings);
        showPartList(pli.partList, {
            pitch: (0, utils_1.getPitch)(planSettings.size),
            width: rgbaArray.width,
            height: rgbaArray.height
        });
        return {
            palette,
            quantized,
            partList: pli.partList,
            partListImage: pli,
            planSettings,
            displaySettings
        };
    }
    function acceptUserImage(src) {
        myImg.src = src;
        window.localStorage.setItem("gallery-index", gallery.length.toString());
        gallery.push(src);
        renderGallery();
        window.setTimeout(resaveGallery, 100);
    }
    function renderGallery() {
        preact.render(<gallery_1.Gallery gallery={gallery} load={name => {
                const gi = gallery.indexOf(name);
                window.localStorage.setItem('gallery-index', gi.toString());
                myImg.src = `${name}`;
            }} requestDelete={index => {
                gallery.splice(index, 1);
                renderGallery();
                setTimeout(resaveGallery, 50);
            }}/>, document.getElementById("gallery-list"));
    }
    function resaveGallery() {
        let userIndex = 0;
        for (let i = 0; i < 101; i++) {
            if (predefinedGallery.includes(gallery[i]))
                continue;
            if (gallery[i] === undefined) {
                window.localStorage.removeItem(keyFormat(userIndex));
            }
            else {
                window.localStorage.setItem(keyFormat(userIndex), gallery[i]);
            }
            userIndex++;
        }
    }
}
function saveSvg() {
    const blob = new Blob([document.getElementById("plan").outerHTML], { type: "image/svg;charset=utf-8" });
    saver.saveAs(blob, "plan.svg");
}
function makePng(ppi) {
    /*
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
    */
}
function processImage(imageData, planSettings) {
    const { mark } = (0, utils_1.timer)();
    const uncroppedRgbaArray = (0, image_utils_1.imageDataToRgbaArray)(imageData);
    mark("Image -> RGBA");
    let transparency;
    switch (planSettings.transparency) {
        case "auto":
            mark("Infer transparency");
            transparency = (0, image_utils_1.inferTransparencyValue)(uncroppedRgbaArray);
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
            transparency = (0, image_utils_1.getCornerTransparency)(uncroppedRgbaArray);
            break;
    }
    const rgbaArray = (0, image_utils_1.applyTransparencyAndCrop)(uncroppedRgbaArray, transparency);
    mark("Apply transparency & crop");
    (0, image_utils_1.applyImageAdjustments)(rgbaArray, planSettings.brightness, planSettings.contrast, planSettings.saturation);
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
    const palette = (0, palettizer_1.makePalette)(rgbaArray, allowedColors, planSettings);
    mark("Create palette");
    const quantized = (0, palettizer_1.palettize)(rgbaArray, palette);
    mark("Apply palette");
    return ({
        palette,
        rgbaArray,
        quantized
    });
}
function createPartListImage(palette, quantized) {
    const partList = getPartList(palette);
    const res = new Array(quantized.height);
    const lookup = new Map();
    for (const e of palette) {
        lookup.set(e.target, partList.filter(p => p.target === e.target)[0]);
    }
    for (let y = 0; y < quantized.height; y++) {
        res[y] = new Array(quantized.width);
        for (let x = 0; x < quantized.width; x++) {
            if (quantized.pixels[y][x] === undefined) {
                res[y][x] = undefined;
            }
            else {
                res[y][x] = lookup.get(quantized.pixels[y][x]);
            }
        }
    }
    return ({
        pixels: res,
        width: quantized.width,
        height: quantized.height,
        partList
    });
}
const keyFormat = (i) => `saved-image-${i}`;
function saveImageToGalleryStorage(src) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const enc = canvas.toDataURL('image/png');
        for (let i = 0; i < 100; i++) {
            const key = keyFormat(i);
            const extant = window.localStorage.getItem(key);
            if (extant === enc) {
                // Duplicate, just bail
                break;
            }
            if (extant === null) {
                window.localStorage.setItem(key, enc);
                break;
            }
        }
    };
    img.src = src;
}
function listenForImagePastes(callback) {
    window.addEventListener("paste", function (evt) {
        var _a, _b;
        const e = evt;
        for (const item of (_b = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : []) {
            if (item.type.indexOf("image") !== -1) {
                var blob = item.getAsFile();
                var source = URL.createObjectURL(blob);
                callback(source);
            }
        }
    });
}
function showPartList(partList, stats) {
    preact.render(<>
        <table className="part-list">
            <thead>
                <tr>
                    <th colSpan={5} className="top-header">Legend</th>
                </tr>
            </thead>
            <tbody>
                {partList.map(ent => {
            return <tr key={ent.symbol + ent.count + ent.target.name}>
                        <td className="legend-symbol">{ent.symbol}</td>
                        <td className="part-count">{ent.count.toLocaleString()}</td>
                        <td className="color-code">{ent.target.code}</td>
                        <td style={{ color: (0, utils_1.colorEntryToHex)(ent.target) }}>⬤</td>
                        <td><span className="colorName">{ent.target.name}</span></td>
                    </tr>;
        })}
            </tbody>
        </table>
        <table className="plan-stats">
            <thead>
                <tr>
                    <th colSpan={4} className="top-header">Statistics</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="stat-label">Width</td>
                    <td className="stat-value">{stats.width.toLocaleString()}px</td>
                    <td className="stat-value">{fmt(stats.width * stats.pitch)}mm</td>
                    <td className="stat-value">{fmt(stats.width * stats.pitch / 25.4)}"</td>
                </tr>
                <tr>
                    <td className="stat-label">Height</td>
                    <td className="stat-value">{stats.height.toLocaleString()}px</td>
                    <td className="stat-value">{fmt(stats.height * stats.pitch)}mm</td>
                    <td className="stat-value">{fmt(stats.height * stats.pitch / 25.4)}"</td>
                </tr>
                <tr>
                    <td className="stat-label">Pixels</td><td colSpan={4} className="stat-value">{partList.reduce((a, b) => a + b.count, 0).toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    </>, document.getElementById("legend"));
    function fmt(n) {
        return n.toFixed(2);
    }
}
function renderPlan(svg, image, planSettings, displaySettings) {
    var _a;
    const svgns = "http://www.w3.org/2000/svg";
    const colorLayer = document.getElementById("layer-colors");
    const gridLayer = document.getElementById("layer-grid");
    const textLayer = document.getElementById("layer-text");
    const refobjLayer = document.getElementById("layer-refobj");
    (_a = document.getElementById("plan-background")) === null || _a === void 0 ? void 0 : _a.setAttribute("fill", displaySettings.background);
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
    // Group per color
    for (let i = 0; i < image.partList.length; i++) {
        const parts = [];
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                if (image.pixels[y][x] === image.partList[i]) {
                    parts.push(`M ${x * 32} ${y * 32} l 32 0 l 0 32 l -32 0 l 0 -32 z`);
                }
            }
        }
        const r = document.createElementNS(svgns, "path");
        r.setAttribute("d", parts.join(" "));
        r.setAttribute("fill", (0, utils_1.colorEntryToHtml)(image.partList[i].target));
        r.setAttribute("stroke-width", "1px");
        /*
        r.addEventListener("mouseenter", () => console.log(image.partList[i].target.name));
        r.addEventListener("mouseenter", () => {
            r.setAttribute("stroke", "white");
        });
        r.addEventListener("mouseleave", () => {
            r.setAttribute("stroke", "");
        });
        */
        colorLayer.appendChild(r);
    }
    /** old algorithm
    for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
            const r = document.createElementNS(svgns, "use");
            r.setAttribute("href", "#" + displaySettings.shaping);
            r.setAttribute("x", x * 32);
            r.setAttribute("y", y * 32);
            const pixel = image.pixels[y][x];
            if (pixel === undefined) {
                r.setAttribute("fill", "transparent");
            } else {
                r.setAttribute("fill", colorEntryToHtml(pixel.target));
            }
            colorLayer.appendChild(r);
        }
    }
    */
    // Symbols
    if (displaySettings.planStyle === "symbols") {
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                const px = image.pixels[y][x];
                if (px === undefined)
                    continue;
                const t = document.createElementNS(svgns, "text");
                t.innerHTML = px.symbol;
                t.setAttribute("x", (x + 0.5) * 32);
                t.setAttribute("y", (y + 0.8) * 32);
                t.setAttribute("text-anchor", "middle");
                if ((0, utils_1.isBright)(px.target)) {
                    t.setAttribute("class", "bright");
                }
                else {
                    t.setAttribute("class", "dark");
                }
                textLayer.appendChild(t);
            }
        }
    }
    // Spans
    if (displaySettings.planStyle === "spans" || displaySettings.planStyle === "symbolspans") {
        for (let y = 0; y < image.height; y++) {
            let nowColor = undefined;
            let runCount = 0;
            for (let x = 0; x <= image.width; x++) {
                const px = image.pixels[y][x];
                // Running labels
                if (nowColor === px) {
                    runCount++;
                }
                else {
                    if (runCount > 0) {
                        addAt(nowColor, runCount, x, y);
                    }
                    nowColor = px;
                    runCount = 1;
                }
                if (x === image.width)
                    break;
            }
        }

        function addAt(px, runCount, endX, y) {
            if (displaySettings.planStyle === "spans") {
                if (runCount < 2)
                    return;
            }
            else {
                if (px === undefined)
                    return;
            }
            const t = document.createElementNS(svgns, "text");
            if (displaySettings.planStyle === "spans") {
                t.innerHTML = runCount.toString();
            }
            else {
                const sym = px === null || px === void 0 ? void 0 : px.symbol;
                if (runCount === 1) {
                    t.innerHTML = sym;
                }
                else if (runCount === 2) {
                    t.innerHTML = `${sym}`;
                }
                else {
                    t.innerHTML = `${sym}×${runCount.toString()}`;
                }
            }
            t.setAttribute("x", ((endX - runCount / 2) * 32).toString());
            t.setAttribute("y", ((y + 0.8) * 32).toString());
            t.setAttribute("text-anchor", "middle");
            if (px === undefined ? !isBackgroundDark : (0, utils_1.isBright)(px.target)) {
                t.setAttribute("class", "bright");
            }
            else {
                t.setAttribute("class", "dark");
            }
            textLayer.appendChild(t);
        }
    }

    // Grid lines
    if (displaySettings.grid !== "none") {
        const gridInterval = +displaySettings.grid;
        for (let y = 1; y < image.height; y++) {
            const line = document.createElementNS(svgns, "line");
            line.classList.add("gridline");
            line.classList.add(y % gridInterval === 0 ? "gridmajor" : "gridminor");
            line.setAttribute("x1", 2);
            line.setAttribute("x2", image.width * 32 - 4);
            line.setAttribute("y1", y * 32);
            line.setAttribute("y2", y * 32);
            gridLayer.appendChild(line);
        }
        for (let x = 1; x < image.width; x++) {
            const line = document.createElementNS(svgns, "line");
            line.classList.add(x % gridInterval === 0 ? "gridmajor" : "gridminor");
            line.setAttribute("x1", x * 32);
            line.setAttribute("x2", x * 32);
            line.setAttribute("y1", 2);
            line.setAttribute("y2", image.height * 32 - 4);
            gridLayer.appendChild(line);
        }
    }

    // Reference object
    if (displaySettings.refobj !== "none") {
        const factor = 32 / (0, utils_1.getPitch)(planSettings.size);
        const img = document.createElementNS(svgns, "image");
        const refObj = refObjs[displaySettings.refobj];
        img.setAttribute("href", refObj.url);
        img.setAttribute("width", refObj.width * factor);
        img.setAttribute("height", refObj.height * factor);
        img.setAttribute("opacity", 0.8);
        img.setAttribute("x", image.width * 32 - refObj.width * factor);
        img.setAttribute("y", image.height * 32 - refObj.height * factor);
        refobjLayer.appendChild(img);
    }
    svg.setAttribute("viewBox", `0 0 ${image.width * 32} ${image.height * 32}`);
    svg.appendChild(gridLayer);
    svg.appendChild(colorLayer);
    svg.appendChild(textLayer);
    svg.appendChild(refobjLayer);
    
    function clearChildren(el) {
        el.innerHTML = "";
    }
}
function getPartList(palette) {
    const res = [];
    for (const ent of palette) {
        const extant = res.filter(e => e.target === ent.target)[0];
        if (extant) {
            extant.count += ent.count;
        }
        else {
            res.push({ count: ent.count, target: ent.target, symbol: "#" });
        }
    }
    res.sort((a, b) => b.count - a.count);
    // Assign symbols
    for (let i = 0; i < res.length; i++) {
        res[i].symbol = utils_1.symbolAlphabet[i];
    }
    return res;
}
window.addEventListener("DOMContentLoaded", function () {
    app();
});
const predefinedGallery = [
    "squirtle",
    "mario-3",
    "megaman_x",
    "earthbound",
    "kirby",
    "mushroom",
    "crono",
    "ghost-smw",
    "mew",
    "link-nes",
    "mario-cape",
    "ghost",
    "link",
    "eevee",
    "mario-1",
    "gannon",
    "ken",
    "shyguy",
    "brachiosaur",
    "sonic",
    "smw-plant"
].map(s => `./gallery/${s}.png`).reverse();
