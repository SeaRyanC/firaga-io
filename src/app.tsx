import * as preact from 'preact';
import { useRef, useEffect, useLayoutEffect, useState } from 'preact/hooks';
import { Gallery, GalleryProps } from './gallery';
import { adjustImage, createPartListImage, getImageData, getImageData as getImageDataFromImage, getImageStats, imageDataToRgbaArray, ImageStats, palettizeImage, PartList, PartListEntry, PartListImage, renderPartListImageToDatURL } from './image-utils';
import { AppProps, DisplayProps, DisplaySettings, ImageProps, ImageSettings, MaterialProps, MaterialSettings } from "./types";
import { colorEntryToHex, colorEntryToHtml, getPitch, isBright, timer } from './utils';
import { createGallery } from './user-gallery';
import { PropContext } from './components/context';
import { PrintDialog } from './components/print-dialog';

const svgns = "http://www.w3.org/2000/svg";

const memoized = {
    adjustImage: memoize(adjustImage),
    palettizeImage: memoize(palettizeImage),
    createPartListImage: memoize(createPartListImage)
};

const svgCss = require("./svg.css");
declare const require: any;

const galleryStorage = createGallery();

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
} as const;

const DefaultAppProps: AppProps = {
    display: {
        background: "#777",
        grid: "56",
        planStyle: "none",
        refobj: "none",
    },
    image: {
        brightness: 0,
        contrast: 0,
        saturation: 0,

        flip: false,
        mirror: false,
        repixelate: false,

        transparency: "auto",
    },
    material: {
        colorMatch: "ciede2000",
        nodupes: false,
        palette: "artkal-mini-starter",
        size: "artkal-mini",
    },
    print: {
        paperSize: "letter",
        format: "step-by-step",
        perpsective: "off",
        imageSize: "actual",
        inkSaver: false
    },
    source: {
        displayName: galleryStorage.current[0][0],
        uri: galleryStorage.current[0][1],
        _decoded: undefined as undefined | ImageData
    },
    ui: {
        isUploadOpen: false,
        isPrintOpen: false,
        showLegend: true,
        showSettings: true
    }
} as const;

export function createApp(initProps: AppProps = DefaultAppProps, renderTarget: HTMLElement) {
    let _props = initProps;

    selectImage(_props.source.displayName, _props.source.uri);

    function updateProp<K extends keyof AppProps, T extends keyof AppProps[K]>(parent: K, name: T, value: AppProps[K][T]) {
        _props = { ..._props, [parent]: { ..._props[parent], [name]: value } };
        preact.render(<App {..._props} />, renderTarget);
        window.localStorage.setItem("props", JSON.stringify(_props, (name, val) => name.startsWith("_") ? undefined : val));
    }

    function acceptUserImage(displayName: string, uri: string) {
        galleryStorage.add(displayName, uri);
        selectImage(displayName, uri);
    }

    function selectImage(displayName: string, uri: string) {
        getImageDataFromName(uri, data => {
            updateProp("source", "uri", uri);
            updateProp("source", "displayName", displayName);
            updateProp("source", "_decoded", data);
            updateProp("ui", "isUploadOpen", false);
        });
    }

    function App(props: AppProps) {
        useLayoutEffect(() => {
            window.addEventListener("paste", function (evt) {
                const e = evt as ClipboardEvent;
                for (const item of e.clipboardData?.items ?? []) {
                    if (item.type.indexOf("image") !== -1) {
                        const blob = item.getAsFile();
                        if (!blob) continue;
                        const reader = new FileReader();
                        reader.onload = (img) => {
                            const uri = img.target!.result as string;
                            acceptUserImage(blob.name, uri);
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            });

            window.addEventListener("keydown", evt => {
                if (evt.key === "Escape") {
                    updateProp("ui", "isPrintOpen", false);
                    updateProp("ui", "isUploadOpen", false);
                }
            })
        }, []);

        const none: Record<string, undefined> = {};
        const imageData = props.source._decoded;
        const adjustedImageData = imageData && memoized.adjustImage(imageData, props.image);
        const processedRgbaArray = adjustedImageData && imageDataToRgbaArray(adjustedImageData);
        const { palette, quantized } = processedRgbaArray ? memoized.palettizeImage(processedRgbaArray, props.material) : none;
        const image = (palette && quantized) ? memoized.createPartListImage(palette, quantized) : undefined;
        const pitch = getPitch(props.material.size);

        return <div class="app-top">
            <PropContext.Provider value={updateProp}>
                <div class="toolbar">
                    <button class="toolbar-button" title="Upload" onClick={() => updateProp("ui", "isUploadOpen", true)}>📂</button>
                    <button class="toolbar-button" title="Settings" onClick={() => updateProp("ui", "showSettings", !props.ui.showSettings)}>⚙</button>
                    <button class="toolbar-button" title="Print..." onClick={() => updateProp("ui", "isPrintOpen", true)}>🖨</button>
                    <button class="toolbar-button" title="Legend" onClick={() => updateProp("ui", "showLegend", !props.ui.showLegend)}>📃</button>
                    <button class="toolbar-button" title="Help">❓</button>
                </div>
                <div class="app-main">
                    {props.ui.showSettings && <div class="settings">
                        <MaterialSettingsRow {...props.material} />
                        <ImageSettingsRow {...props.image} />
                        <DisplaySettingsRow {...props.display} />

                        {!!image && <Stats img={image} pitch={getPitch(props.material.size)} />}
                    </div>}
                    {image ? <PlanSvg image={image} pitch={pitch} displaySettings={props.display} /> : <div>Loading...</div>}
                    {props.ui.showLegend && image && <Legend partList={image.partList} />}
                </div>
                {props.ui.isUploadOpen &&
                    <GalleryContainer
                        gallery={galleryStorage.current}
                        load={(name, uri) => {
                            selectImage(name, uri);
                        }}
                        requestDelete={(uri) => {
                            galleryStorage.remove(uri);
                        }}
                    />}
                {props.ui.isPrintOpen && image &&
                    <PrintDialog image={image} settings={props.print} />}
            </PropContext.Provider>
        </div>;
    }

    function ImageSettingsRow(props: ImageProps) {
        return (
            <div class="settings-row">
                <details open>
                    <summary>Image Settings</summary>
                    <div class="options-row">
                        <div class="options-group">
                            <span class="header">Transparency</span>
                            {getRadioGroup(props, "image", "transparency", ImageSettings.transparency)}
                        </div>

                        <div class="options-group">
                            <span class="header">Color Adjust</span>
                            {getSlider(props, "image", "brightness", "Brightness")}
                            {getSlider(props, "image", "contrast", "Contrast")}
                            {getSlider(props, "image", "saturation", "Saturation")}
                        </div>

                        <div class="options-group">
                            <span class="header">Transforms</span>
                            {getCheckbox(props, "image", "flip", "Flip")}
                            {getCheckbox(props, "image", "mirror", "Mirror")}
                        </div>
                    </div>
                </details>
            </div>
        );
    }

    function MaterialSettingsRow(props: MaterialProps) {
        return (
            <div class="settings-row">
                <details open>
                    <summary>Material Settings</summary>
                    <div class="options-row">
                        <div class="options-group">
                            <span class="header">Color Matching</span>
                            {getRadioGroup(props, "material", "colorMatch", MaterialSettings.colorMatch)}
                            {getCheckbox(props, "material", "nodupes", "No Duplicates")}
                        </div>

                        <div class="options-group">
                            <span class="header">Palette</span>
                            {getRadioGroup(props, "material", "palette", MaterialSettings.palette)}
                        </div>

                        <div class="options-group">
                            <span class="header">Grid Size</span>
                            {getRadioGroup(props, "material", "size", MaterialSettings.size)}
                        </div>
                    </div>
                </details>
            </div>
        );
    }

    function PlanSvg(props: {
        image: PartListImage,
        displaySettings: AppProps["display"],
        pitch: number
    }) {
        const {
            image,
            displaySettings
        } = props;
        const {
            planStyle
        } = displaySettings;

        const isBackgroundDark = displaySettings.background === "#000" || displaySettings.background === "#777";

        return <svg class="plan"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`-16 -16 ${(image.width + 1) * 32} ${(image.height + 1) * 32}`}
            preserveAspectRatio="xMidYMid meet">
            <style>{svgCss}</style>

            <defs>
                <rect id="melted" width="32" height="32" rx="7" ry="7"></rect>
                <rect id="square" width="32" height="32"></rect>
                <rect id="circle" width="32" height="32" rx="16" ry="16"></rect>
                <pattern id="wood" patternUnits="userSpaceOnUse" width="400" height="400">
                    <image href="https://upload.wikimedia.org/wikipedia/commons/5/50/Mahag%C3%B3ni_001.jpg"
                        x="0" y="0" width="400" height="400" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill={displaySettings.background} />
            <ColorLayer image={image} />
            <GridLayer image={image} grid={displaySettings.grid} />
            <TextLayer image={image} planStyle={props.displaySettings.planStyle} isBackgroundDark={isBackgroundDark} />
            <RefObjLayer pitch={props.pitch} name={displaySettings.refobj} />
        </svg>;
    }

    function TextLayer(props: { image: PartListImage, planStyle: DisplayProps["planStyle"], isBackgroundDark: boolean }) {
        const { image, planStyle, isBackgroundDark } = props;

        const textLayer = useRef<SVGGElement>(null!);
        useEffect(() => {
            renderSpans();
        }, [image, planStyle, isBackgroundDark])
        return <g ref={textLayer} />;

        function renderSpans() {
            clearChildren(textLayer.current);
            const target = textLayer.current;
            // Symbols
            if (planStyle === "symbols") {
                for (let y = 0; y < image.height; y++) {
                    for (let x = 0; x < image.width; x++) {
                        const px = image.pixels[y][x];
                        if (px === undefined) continue;

                        const t = document.createElementNS(svgns, "text");
                        t.innerHTML = px.symbol;
                        t.setAttribute("x", (x + 0.5) * 32);
                        t.setAttribute("y", (y + 0.8) * 32);
                        t.setAttribute("text-anchor", "middle");
                        if (isBright(px.target)) {
                            t.setAttribute("class", "bright");
                        } else {
                            t.setAttribute("class", "dark");
                        }
                        target.appendChild(t);
                    }
                }
            }

            // Spans
            if (planStyle === "spans" || planStyle === "symbolspans") {
                for (let y = 0; y < image.height; y++) {
                    let nowColor = undefined;
                    let runCount = 0;
                    for (let x = 0; x <= image.width; x++) {
                        const px = image.pixels[y][x];
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

                        if (x === image.width) break;
                    }
                }

                function addAt(px: PartListEntry | undefined, runCount: number, endX: number, y: number) {
                    if (planStyle === "spans") {
                        if (runCount < 2) return;
                    } else {
                        if (px === undefined) return;
                    }

                    const t = document.createElementNS(svgns, "text");
                    if (planStyle === "spans") {
                        t.innerHTML = runCount.toString();
                    } else {
                        const sym = px?.symbol;
                        if (runCount === 1) {
                            t.innerHTML = sym!;
                        } else if (runCount === 2) {
                            t.innerHTML = `${sym}`;
                        } else {
                            t.innerHTML = `${sym}×${runCount.toString()}`;
                        }
                    }

                    t.setAttribute("x", ((endX - runCount / 2) * 32).toString());
                    t.setAttribute("y", ((y + 0.8) * 32).toString());
                    t.setAttribute("text-anchor", "middle");
                    if (px === undefined ? !props.isBackgroundDark : isBright(px.target)) {
                        t.setAttribute("class", "bright");
                    } else {
                        t.setAttribute("class", "dark");
                    }
                    target.appendChild(t);
                }
            }
        }
    }

    function GridLayer(props: { image: PartListImage, grid: DisplayProps["grid"] }) {
        const { image, grid } = props;
        const gridLayer = useRef<SVGGElement>(null!);
        useEffect(() => {
            renderGrid();
        }, [image, grid]);
        return <g ref={gridLayer} />;

        function renderGrid() {
            clearChildren(gridLayer.current);

            const target = gridLayer.current;
            // Grid lines
            if (grid !== "none") {
                const gridInterval = +grid;
                for (let y = 0; y <= image.height; y++) {
                    const line = document.createElementNS(svgns, "line");
                    line.classList.add("gridline");
                    line.classList.add(gridInterval < image.height && y % gridInterval === 0 ? "gridmajor" : "gridminor");
                    line.setAttribute("x1", -16);
                    line.setAttribute("x2", image.width * 32 + 16);
                    line.setAttribute("y1", y * 32);
                    line.setAttribute("y2", y * 32);
                    target.appendChild(line);
                }
                for (let x = 0; x <= image.width; x++) {
                    const line = document.createElementNS(svgns, "line");
                    line.classList.add(gridInterval < image.width && x % gridInterval === 0 ? "gridmajor" : "gridminor");
                    line.setAttribute("x1", x * 32);
                    line.setAttribute("x2", x * 32);
                    line.setAttribute("y1", -16);
                    line.setAttribute("y2", image.height * 32 + 16);
                    target.appendChild(line);
                }
            }
        }
    }

    function ColorLayer(props: { image: PartListImage }) {
        const colorsLayer = useRef<SVGGElement>(null!);
        const { image } = props;

        useEffect(() => {
            clearChildren(colorsLayer.current);
            renderColors(colorsLayer.current!);
        }, [props.image]);

        return <g ref={colorsLayer} />;

        function renderColors(colorLayer: SVGGElement) {
            const { mark } = timer();
            // Color Cells
            // Group per color
            for (let i = 0; i < image.partList.length; i++) {
                const parts: string[] = [];
                for (let y = 0; y < image.height; y++) {
                    for (let x = 0; x < image.width; x++) {
                        if (image.pixels[y][x] === image.partList[i]) {
                            parts.push(`M ${x * 32} ${y * 32} l 32 0 l 0 32 l -32 0 l 0 -32 z`);
                        }
                    }
                }
                const r = document.createElementNS(svgns, "path");
                r.setAttribute("d", parts.join(" "));
                r.setAttribute("fill", colorEntryToHtml(image.partList[i].target));
                r.setAttribute("stroke-width", "1px");
                const title = document.createElementNS(svgns, "title");
                title.innerHTML = `${image.partList[i].target.code} - ${image.partList[i].target.name}`;
                r.appendChild(title);
                colorLayer.appendChild(r);
            }
            mark("Render colors");
        }

    }

    function RefObjLayer(props: { pitch: number, name: DisplayProps["refobj"] }) {
        if (props.name === "none") {
            return <g></g>;
        }
        const refObj = refObjs[props.name];
        const factor = 32 / props.pitch;
        return <g><image
            href={refObj.url}
            width={refObj.width * factor}
            height={refObj.height * factor}
            opacity={0.8}
            x={0}
            y={0}
        /></g>;
    }

    function Legend({ partList }: { partList: PartList }) {
        return <table className="part-list">
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
                        <td className="color-swatch" style={{ color: colorEntryToHex(ent.target) }}>⬤</td>
                        <td className="color-name"><span className="colorName">{ent.target.name}</span></td>
                    </tr>
                })}
            </tbody>
        </table>;
    }

    function Stats({ img, pitch }: { img: PartListImage, pitch: number }) {
        return <table className="plan-stats">
            <thead>
                <tr>
                    <th colSpan={4} className="top-header">Statistics</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="stat-label">Width</td>
                    <td className="stat-value">{img.width.toLocaleString()}px</td>
                    <td className="stat-value">{fmt(img.width * pitch)}mm</td>
                    <td className="stat-value">{fmt(img.width * pitch / 25.4)}"</td>
                </tr>
                <tr>
                    <td className="stat-label">Height</td>
                    <td className="stat-value">{img.height.toLocaleString()}px</td>
                    <td className="stat-value">{fmt(img.height * pitch)}mm</td>
                    <td className="stat-value">{fmt(img.height * pitch / 25.4)}"</td>
                </tr>
                <tr>
                    <td className="stat-label">Pixels</td><td colSpan={4} className="stat-value">{getImageStats(img).pixels}</td>
                </tr>
            </tbody>
        </table>;

        function fmt(n: number) {
            return n.toFixed(2);
        }
    }

    function DisplaySettingsRow(props: DisplayProps) {
        return <div class="settings-row">
            <details open>
                <summary>Plan Settings</summary>
                <div class="options-row">
                    <div className="options-group">
                        <span className="header">Legend</span>
                        {getRadioGroup(props, "display", "planStyle", DisplaySettings.planStyle)}
                    </div>

                    <div className="options-group">
                        <span className="header">Grid</span>
                        {getRadioGroup(props, "display", "grid", DisplaySettings.grid)}
                    </div>

                    <div className="options-group">
                        <span className="header">Background</span>
                        {getRadioGroup(props, "display", "background", DisplaySettings.background)}
                    </div>

                    <div className="options-group">
                        <span className="header">Comparison</span>
                        {getRadioGroup(props, "display", "refobj", DisplaySettings.refobj)}
                    </div>
                </div>
            </details>
        </div>;
    }

    function GalleryContainer(props: GalleryProps) {
        const fileInputRef = useRef<HTMLInputElement>();
        const dropBoxRef = useRef<HTMLDivElement>();

        useEffect(() => {
            const db = dropBoxRef.current!;
            db.addEventListener("dragenter", e => (e.stopPropagation(), e.preventDefault()), false);
            db.addEventListener("dragover", e => (e.stopPropagation(), e.preventDefault()), false);
            db.addEventListener("drop", function (e) {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer?.files;
                if (!files) return;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (!file.type.startsWith('image/'))
                        continue;

                    const reader = new FileReader();
                    reader.onload = (img) => {
                        const name = file.name;
                        const uri = img.target!.result as string;
                        acceptUserImage(name, uri);
                    };
                    reader.readAsDataURL(file);
                }
            }, false);
        }, []);

        return <div class="gallery">
            <h2>Pick Image</h2>
            <div ref={dropBoxRef} class="dropbox"><label for="upload-image-button" style="display: inline"
                class="download-button-label">Upload</label>
                <input
                    id="upload-image-button"
                    style="display: none;" type="file" accept="image/png, image/jpeg" ref={fileInputRef}
                    onChange={fileInputChanged}
                    value="Choose..."></input>, Paste, or Drag & Drop here
            </div>

            <h2>Gallery</h2>
            <div class="gallery-list-container">
                <Gallery {...props} />
            </div>
            <div class="about">
                <a href="https://github.com/SeaRyanC/firaga-io"><img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="40"
                    height="40" /></a>
            </div>
        </div>;

        function fileInputChanged() {
            if (!fileInputRef.current) return;
            if (!fileInputRef.current.files) return;
            const files = fileInputRef.current.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (img) => {
                    acceptUserImage(file.name, img.target!.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    function getCheckbox<S extends keyof AppProps, K extends keyof AppProps[S]>(props: Record<K, boolean>, subKey: S, valueKey: K, label: string) {
        return <label><input
            type="checkbox"
            checked={props[valueKey]}
            onChange={(arg) => {
                updateProp(subKey, valueKey, !props[valueKey] as any);
            }} />{label}</label>;
    }

    function getSlider<S extends keyof AppProps, K extends keyof AppProps[S]>(props: AppProps[S] & Record<K, number>, parentKey: S, key: K, label: string) {
        return <label><input type="range" onChange={changed} min="-10" max="10" step="1" value={props[key]} />{label}</label>

        function changed(e: any) {
            updateProp(parentKey, key, e.target.value);
        }
    }

    function getRadioGroup<K extends string>(props: Record<K, string | number>, parentProp: keyof AppProps, key: K, settings: RadioGroupValues) {
        // TODO: Why are these casts needed?
        return radioGroup(key, (k, v) => updateProp(parentProp, k as never, v as never), props[key], settings)
    }
}

type RadioGroupValues = readonly (readonly [string | number, unknown])[];
export function radioGroup<V extends RadioGroupValues>(name: string, changed: (name: string, value: any) => void, defaultValue: V[number][0], values: V) {
    return <>
        {...values.map(([value, caption]) => {
            return <label key={value}><input type="radio" onChange={fireChanged} name={name} value={value} checked={value === defaultValue} />{caption}</label>;

            function fireChanged() {
                changed(name, value);
            }
        }
        )}
    </>;
}

function getImageDataFromName(name: string, callback: (data: ImageData) => void) {
    const img = new Image();
    img.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d")?.drawImage(img, 0, 0);
        callback(getImageData(img));
    });
    img.src = name;
}

function memoize<F extends (...args: any) => any>(func: F & Function): F {
    const calls: Array<[any[], any]> = [];

    return function (...args: any[]) {
        for (let i = 0; i < calls.length; i++) {
            if (calls[i][0].length === args.length) {
                let match = true;
                for (let j = 0; j < args.length; j++) {
                    if (calls[i][0][j] !== args[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return calls[i][1];
                }
            }
        }
        const r = func.apply(undefined, args);
        calls.push([args, r]);
        if (calls.length > 20) {
            calls.splice(0, 20);
        }
        return r;
    } as any as F;
}

function clearChildren(el: SVGElement | undefined) {
    if (el) {
        el.innerHTML = "";
    }
}
