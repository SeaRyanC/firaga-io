// import saver = require('file-saver');
// import preact = require('preact');
// import { loadColorData } from './color-data';
// import { createDisplaySettingsComponent, DisplaySettings } from "./display-settings";
// import { createDownloadBar, PrintOptions } from './download-bar';
// // import { Gallery } from "./gallery";
// import { applyImageAdjustments, applyTransparencyAndCrop, getCornerTransparency, getImageData, imageDataToRgbaArray, inferTransparencyValue } from "./image-utils";
// import { makePalette, palettize } from "./palettizer";
// import { makePdf, makeTestSheet } from './pdf-generator';
// import { createMaterialSettingsComponent } from "./material-settings";
// import { InputColorsToObjectColors as ColorAssignments, MaterialProps, ObjectColor, PalettizedImage, RgbaImage } from "./types";
// import { colorEntryToHex, colorEntryToHtml, getPitch, isBright, symbolAlphabet, timer } from "./utils";
// import { createImageSettingsComponent, ImageSettings } from './image-settings';
import { createApp } from './app';

window.addEventListener("DOMContentLoaded", function () {
    const s = window.localStorage.getItem("props");
    let props = undefined;
    if (s !== null) {
        props = JSON.parse(s);
    }
    createApp(props, document.body);
});

// const refObjs = {
//     quarter: {
//         url: "https://upload.wikimedia.org/wikipedia/commons/4/44/2014_ATB_Quarter_Obv.png",
//         width: 24.26,
//         height: 24.26
//     },
//     dollar: {
//         url: "https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg",
//         width: 156.1,
//         height: 66.3
//     },
//     credit: {
//         url: "https://upload.wikimedia.org/wikipedia/commons/2/23/CIDSampleAmex.png",
//         width: 85.60,
//         height: 53.98
//     }
// };

// const colorData = loadColorData();
// const artkalStarterCodes =
//     ("CT1,C01,C88,C33,C34,C02," +
//         "C51,C47,C23,C31,C32,C78," +
//         "C22,C44,C07,C09,C05,C57," +
//         "C50,C25,C26,C52,C27,C64," +
//         "C10,C42,C48,C03,C04,C17," +
//         "C12,C13,C14,C86,C15,C70," +
//         "C39,C60,C79,C54,C81,C82," +
//         "C68,C19,C38,C20,C37,C21").split(",");
/*
function app() {
    let last: ReturnType<typeof renderWorker> = null!;

    const imageSettingsComp = createImageSettingsComponent(render);
    preact.render(imageSettingsComp.component(), document.getElementById("image-settings") as HTMLDivElement)

    const materialSettingsComp = createMaterialSettingsComponent(render);
    preact.render(materialSettingsComp.component(), document.getElementById("plan-settings") as HTMLDivElement)

    const displaySettingsComp = createDisplaySettingsComponent(render);
    preact.render(displaySettingsComp.component(), document.getElementById("display-settings") as HTMLDivElement);

    const downloadBar = createDownloadBar(download);
    preact.render(downloadBar.component(), document.getElementById("print-settings") as HTMLDivElement);

    const gallery: string[] = [...predefinedGallery];
    for (let i = 0; i < 100; i++) {
        const e = window.localStorage.getItem(keyFormat(i));
        if (e !== null) {
            gallery.push(e);
        }
    }
    renderGallery();
    setupDropbox();

    const myImg = document.getElementById("myImg") as HTMLImageElement;
    myImg.onload = function () {
        render();
    };
    const gi = +window.localStorage.getItem("gallery-index")!;
    if (gallery[gi]) {
        myImg.src = gallery[gi];
    } else {
        myImg.src = gallery[gallery.length - 1];
    }
    const planSvg = document.getElementById("plan") as any as SVGElement;

    listenForImagePastes(src => {
        acceptUserImage(src);
    });

    function setupDropbox() {
        const dropbox = document.getElementById("drop-target")!;
        dropbox.addEventListener("dragenter", e => (e.stopPropagation(), e.preventDefault()), false);
        dropbox.addEventListener("dragover", e => (e.stopPropagation(), e.preventDefault()), false);
        dropbox.addEventListener("drop", function (e) {
            e.stopPropagation();
            e.preventDefault();
            const files = (e as any).dataTransfer?.files as FileList;
            if (!files)
                return;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/'))
                    continue;

                const reader = new FileReader();
                reader.onload = (img) => {
                    acceptUserImage(img.target!.result as string);
                };
                reader.readAsDataURL(file);
            }
        }, false);
    }

    function download(name: string, opts: PrintOptions) {
        switch (name) {
            case "calibration":
                makeTestSheet();
                break;

            case "pdf":
                makePdf(last.partListImage, last.planSettings, opts);
                break;

            default:
                throw new Error(name);
        }
    }

    function render() {
        last = renderWorker();
    }

    function renderWorker() {
        const materialSettings = materialSettingsComp.value();
        const imageSettings = imageSettingsComp.value();

        const imageData = getImageData(myImg);

        const { rgbaArray } = adjustImage(imageData, imageSettings);
        const { palette, quantized } = palettizeImage(rgbaArray, materialSettings)

        const displaySettings = displaySettingsComp.value();
        const pli = createPartListImage(palette, quantized);
        renderPlan(planSvg, pli, materialSettings, displaySettings);

        showPartList(pli.partList, {
            pitch: getPitch(materialSettings.size),
            width: rgbaArray.width,
            height: rgbaArray.height
        });

        return {
            palette,
            quantized,
            partList: pli.partList,
            partListImage: pli,
            planSettings: materialSettings,
            displaySettings
        };
    }

    function acceptUserImage(src: string) {
        myImg.src = src;
        window.localStorage.setItem("gallery-index", gallery.length.toString());
        gallery.push(src);
        renderGallery();
        window.setTimeout(resaveGallery, 100);
    }

    function renderGallery() {
        preact.render(<Gallery
            gallery={gallery}
            load={name => {
                const gi = gallery.indexOf(name);
                window.localStorage.setItem('gallery-index', gi.toString());
                myImg.src = `${name}`;
            }}
            requestDelete={index => {
                gallery.splice(index, 1);
                renderGallery();
                setTimeout(resaveGallery, 50);
            }}
        />, document.getElementById("gallery-list")!);
    }

    function resaveGallery() {
        let userIndex = 0;
        for (let i = 0; i < 101; i++) {
            if (predefinedGallery.includes(gallery[i])) continue;
            if (gallery[i] === undefined) {
                window.localStorage.removeItem(keyFormat(userIndex));
            } else {
                saveTo(gallery[i], userIndex);
            }
            userIndex++;
        }

        async function saveTo(blobUrl: string, index: number) {
            const blob = await (await fetch(blobUrl)).blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                window.localStorage.setItem(keyFormat(index), reader.result as string);
            }
        }

    }
}

function saveSvg() {
    const blob = new Blob([document.getElementById("plan")!.outerHTML], { type: "image/svg;charset=utf-8" });
    saver.saveAs(blob, "plan.svg");
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



const keyFormat = (i: number) => `saved-image-${i}`;
function saveImageToGalleryStorage(src: string) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
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

function showPartList(partList: PartList, stats: { pitch: number, height: number, width: number }) {
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
                        <td style={{ color: colorEntryToHex(ent.target) }}>⬤</td>
                        <td><span className="colorName">{ent.target.name}</span></td>
                    </tr>
                }) as any}
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
    </>, document.getElementById("legend")!);


    function fmt(n: number) {
        return n.toFixed(2);
    }
}

function renderPlan(svg: SVGElement, image: PartListImage, materialSettings: MaterialProps, displaySettings: DisplaySettings) {
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
    // clearChildren(colorLayer);
    // clearChildren(gridLayer);
    // clearChildren(textLayer);
    // clearChildren(refobjLayer);

    // const isBackgroundDark = displaySettings.background === "#000" || displaySettings.background === "#555";

    // // Color Cells
    // // Group per color
    // for (let i = 0; i < image.partList.length; i++) {
    //     const parts: string[] = [];
    //     for (let y = 0; y < image.height; y++) {
    //         for (let x = 0; x < image.width; x++) {
    //             if (image.pixels[y][x] === image.partList[i]) {
    //                 parts.push(`M ${x * 32} ${y * 32} l 32 0 l 0 32 l -32 0 l 0 -32 z`);
    //             }
    //         }
    //     }
    //     const r = document.createElementNS(svgns, "path");
    //     r.setAttribute("d", parts.join(" "));
    //     r.setAttribute("fill", colorEntryToHtml(image.partList[i].target));
    //     r.setAttribute("stroke-width", "1px");
    //     r.addEventListener("mouseenter", () => console.log(image.partList[i].target.name));
    //     r.addEventListener("mouseenter", () => {
    //         r.setAttribute("stroke", "white");
    //     });
    //     r.addEventListener("mouseleave", () => {
    //         r.setAttribute("stroke", "");
    //     });
    //     colorLayer.appendChild(r);
    // }

    // // Symbols
    // if (displaySettings.planStyle === "symbols") {
    //     for (let y = 0; y < image.height; y++) {
    //         for (let x = 0; x < image.width; x++) {
    //             const px = image.pixels[y][x];
    //             if (px === undefined) continue;

    //             const t = document.createElementNS(svgns, "text");
    //             t.innerHTML = px.symbol;
    //             t.setAttribute("x", (x + 0.5) * 32);
    //             t.setAttribute("y", (y + 0.8) * 32);
    //             t.setAttribute("text-anchor", "middle");
    //             if (isBright(px.target)) {
    //                 t.setAttribute("class", "bright");
    //             } else {
    //                 t.setAttribute("class", "dark");
    //             }
    //             textLayer.appendChild(t);
    //         }
    //     }
    // }

    // // Spans
    // if (displaySettings.planStyle === "spans" || displaySettings.planStyle === "symbolspans") {
    //     for (let y = 0; y < image.height; y++) {
    //         let nowColor = undefined;
    //         let runCount = 0;
    //         for (let x = 0; x <= image.width; x++) {
    //             const px = image.pixels[y][x];
    //             // Running labels
    //             if (nowColor === px) {
    //                 runCount++;
    //             } else {
    //                 if (runCount > 0) {
    //                     addAt(nowColor, runCount, x, y)
    //                 }
    //                 nowColor = px;
    //                 runCount = 1;
    //             }

    //             if (x === image.width) break;
    //         }
    //     }

    //     function addAt(px: PartListEntry | undefined, runCount: number, endX: number, y: number) {
    //         if (displaySettings.planStyle === "spans") {
    //             if (runCount < 2) return;
    //         } else {
    //             if (px === undefined) return;
    //         }

    //         const t = document.createElementNS(svgns, "text");
    //         if (displaySettings.planStyle === "spans") {
    //             t.innerHTML = runCount.toString();
    //         } else {
    //             const sym = px?.symbol;
    //             if (runCount === 1) {
    //                 t.innerHTML = sym!;
    //             } else if (runCount === 2) {
    //                 t.innerHTML = `${sym}`;
    //             } else {
    //                 t.innerHTML = `${sym}×${runCount.toString()}`;
    //             }
    //         }

    //         t.setAttribute("x", ((endX - runCount / 2) * 32).toString());
    //         t.setAttribute("y", ((y + 0.8) * 32).toString());
    //         t.setAttribute("text-anchor", "middle");
    //         if (px === undefined ? !isBackgroundDark : isBright(px.target)) {
    //             t.setAttribute("class", "bright");
    //         } else {
    //             t.setAttribute("class", "dark");
    //         }
    //         textLayer.appendChild(t);
    //     }
    // }

    // // Grid lines
    // if (displaySettings.grid !== "none") {
    //     const gridInterval = +displaySettings.grid;
    //     for (let y = 1; y < image.height; y++) {
    //         const line = document.createElementNS(svgns, "line");
    //         line.classList.add("gridline");
    //         line.classList.add(y % gridInterval === 0 ? "gridmajor" : "gridminor");
    //         line.setAttribute("x1", 2);
    //         line.setAttribute("x2", image.width * 32 - 4);
    //         line.setAttribute("y1", y * 32);
    //         line.setAttribute("y2", y * 32);
    //         gridLayer.appendChild(line);
    //     }
    //     for (let x = 1; x < image.width; x++) {
    //         const line = document.createElementNS(svgns, "line");
    //         line.classList.add(x % gridInterval === 0 ? "gridmajor" : "gridminor");
    //         line.setAttribute("x1", x * 32);
    //         line.setAttribute("x2", x * 32);
    //         line.setAttribute("y1", 2);
    //         line.setAttribute("y2", image.height * 32 - 4);
    //         gridLayer.appendChild(line);
    //     }
    // }

    // // Reference object
    // if (displaySettings.refobj !== "none") {
    //     const factor = 32 / getPitch(materialSettings.size);
    //     const img = document.createElementNS(svgns, "image");
    //     const refObj = refObjs[displaySettings.refobj];
    //     img.setAttribute("href", refObj.url);
    //     img.setAttribute("width", refObj.width * factor);
    //     img.setAttribute("height", refObj.height * factor);
    //     img.setAttribute("opacity", 0.8);
    //     img.setAttribute("x", image.width * 32 - refObj.width * factor);
    //     img.setAttribute("y", image.height * 32 - refObj.height * factor);
    //     refobjLayer.appendChild(img);
    // }

    // svg.setAttribute("viewBox", `0 0 ${image.width * 32} ${image.height * 32}`);
    // svg.appendChild(gridLayer);
    // svg.appendChild(colorLayer);
    // svg.appendChild(textLayer);
    // svg.appendChild(refobjLayer);

    // function clearChildren(el: HTMLElement) {
    //     el.innerHTML = "";
    // }
}

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
*/