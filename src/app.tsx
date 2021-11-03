import * as preact from 'preact';
import { useRef, useEffect, useLayoutEffect } from 'preact/hooks';
import { Gallery, GalleryProps } from './gallery';
import { adjustImage, createPartListImage, getImageData, getImageStats, imageDataToRgbaArray,palettizeImage, PartList, PartListImage } from './image-utils';
import { AppProps, DisplayProps, DisplaySettings, ImageProps, ImageSettings, MaterialProps, MaterialSettings } from "./types";
import { colorEntryToHex, dollars, feetInches, getPitch, timeAmount } from './utils';
import { GalleryStorage } from './user-gallery';
import { PropContext } from './components/context';
import { PrintDialog } from './components/print-dialog';
import { PlanSvg } from './components/plan-display';
import { WelcomeScreen } from './components/welcome-screen';

const memoized = {
    adjustImage: memoize(adjustImage),
    palettizeImage: memoize(palettizeImage),
    createPartListImage: memoize(createPartListImage),
    imageDataToRgbaArray: memoize(imageDataToRgbaArray)
};

export function createApp(initProps: AppProps, galleryStorage: GalleryStorage, renderTarget: HTMLElement) {
    let _props = initProps;

    selectImage(_props.source.displayName, _props.source.uri);

    function updateProp<K extends keyof AppProps, T extends keyof AppProps[K]>(parent: K, name: T, value: AppProps[K][T], skipRender = false) {
        _props = { ..._props, [parent]: { ..._props[parent], [name]: value } };
        if (!skipRender) {
            preact.render(<App {..._props} />, renderTarget);
            window.localStorage.setItem("props", JSON.stringify(_props, (name, val) => name.startsWith("_") ? undefined : val));
        }
    }

    // TODO: Update signature to only accept boolean-valued props
    function toggleProp<K extends keyof AppProps, T extends keyof AppProps[K]>(parent: K, name: T) {
        updateProp(parent, name, !_props[parent][name] as any);
    }

    function acceptUserImage(displayName: string, uri: string) {
        galleryStorage.add(displayName, uri);
        selectImage(displayName, uri);
    }

    function selectImage(displayName: string, uri: string) {
        getImageDataFromName(uri, data => {
            updateProp("source", "uri", uri, true);
            updateProp("source", "displayName", displayName, true);
            updateProp("source", "_decoded", data, true);
            updateProp("ui", "isUploadOpen", false);
        });
    }

    function App(props: AppProps) {
        useLayoutEffect(() => {
            // Install paste handler
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

            // Install keyboard shortcuts
            window.addEventListener("keydown", evt => {
                if (evt.ctrlKey) {
                    switch (evt.key) {
                        case "o":
                            toggleProp("ui", "isUploadOpen");
                            break;
                        case "p":
                            toggleProp("ui", "isPrintOpen");
                            break;
                        case "l":
                            toggleProp("ui", "showLegend");
                            break;
                        case "e":
                            toggleProp("ui", "showSettings");
                            break;

                        default:
                            return;
                    }
                    evt.preventDefault();
                } else {
                    switch (evt.key) {
                        case "Escape":
                            updateProp("ui", "isPrintOpen", false);
                            updateProp("ui", "isUploadOpen", false);
                            break;
                    }
                }
            })
        }, []);

        const none: Record<string, undefined> = {};
        const imageData = props.source._decoded;
        const adjustedImageData = imageData && memoized.adjustImage(imageData, props.image);
        const processedRgbaArray = adjustedImageData && memoized.imageDataToRgbaArray(adjustedImageData);
        const { quantized } = processedRgbaArray ? memoized.palettizeImage(processedRgbaArray, props.material, props.image) : none;
        const image = quantized ? memoized.createPartListImage(quantized) : undefined;
        const pitch = getPitch(props.material.size);

        return <div class="app-top">
            <PropContext.Provider value={updateProp}>
                {props.ui.isWelcomeOpen && <WelcomeScreen />}
                <div class="toolbar">
                    <button title="Open..." class={`toolbar-button ${props.ui.isUploadOpen ? "on" : "off"} text`} onClick={() => toggleProp("ui", "isUploadOpen")}>📂<span class="extended-label">Open</span></button>
                    <button title="Print..." class={`toolbar-button ${props.ui.isPrintOpen ? "on" : "off"} text`} onClick={() => toggleProp("ui", "isPrintOpen")}>🖨️<span class="extended-label">Print</span></button>
                    <span class="toolbar-divider" />
                    <button title="Settings" class={`toolbar-button ${props.ui.showSettings ? "on" : "off"} text`} onClick={() => toggleProp("ui", "showSettings")}>⚙️<span class="extended-label">Settings</span></button>
                    <button title="Legend" class={`toolbar-button ${props.ui.showLegend ? "on" : "off"} text`} onClick={() => toggleProp("ui", "showLegend")}>🔑<span class="extended-label">Legend</span></button>
                    <span class="toolbar-divider" />
                    <button title="Help" class={`toolbar-button ${props.ui.isWelcomeOpen ? "on" : "off"} text`} onClick={() => toggleProp("ui", "isWelcomeOpen")}>❔<span class="extended-label">Help</span></button>
                    <a class={`toolbar-button off`} title="GitHub" href="https://github.com/SeaRyanC/firaga-io">👨‍💻<span class="extended-label">Code</span></a>
                    <a class={`toolbar-button off`} title="Twitter" href="https://twitter.com/firaga_io">💬<span class="extended-label">Twitter</span></a>
                </div>
                <div class="app-main">
                    {props.ui.showSettings && <div class="settings">
                        <div class="settings-header">
                            Settings
                            <div class="close-button" onClick={() => updateProp("ui", "showSettings", false)}>✖</div>
                        </div>
                        <div class="settings-list">
                            <MaterialSettingsRow {...props.material} />
                            <ImageSettingsRow {...props.image} />
                            <DisplaySettingsRow {...props.display} />
                        </div>
                    </div>}
                    {image ? <PlanSvg image={image} pitch={pitch} displaySettings={props.display} gridSize={props.material.size} /> : <div>Loading...</div>}
                    {props.ui.showLegend && image && <Legend partList={image.partList} image={image} pitch={getPitch(props.material.size)} />}
                </div>
                {props.ui.isUploadOpen &&
                    <GalleryContainer
                        gallery={galleryStorage.current}
                        load={(name, uri) => {
                            selectImage(name, uri);
                        }}
                        requestDelete={(uri) => {
                            galleryStorage.remove(uri);
                            preact.render(<App {..._props} />, renderTarget);
                        }}
                    />}
                {props.ui.isPrintOpen && image &&
                    <PrintDialog
                        image={image}
                        settings={props.print}
                        gridSize={props.material.size}
                        filename={props.source.displayName} />}
                {props.ui.helpTopic &&
                    <HelpDialog
                        topic={props.ui.helpTopic} />}
            </PropContext.Provider>
            <datalist id="image-ticks">
                <option value="0" label="0" />
            </datalist>
        </div>;
    }

    function ImageSettingsRow(props: ImageProps) {
        return (
            <div class="settings-row">
                <h1>Image</h1>
                <div class="options-row">
                    <div class="options-group">
                        <span class="header">Transparency</span>
                        {getRadioGroup(props, "image", "transparency", ImageSettings.transparency)}
                        {getCheckbox(props, "image", "keepOutline", "Keep Outline")}
                    </div>

                    {   // All current Safari implementations do not support the Canvas2d.filter property yet
                        (navigator.vendor !== "Apple Computer, Inc.") &&
                        <div class="options-group">
                            <span class="header">Color Adjust</span>
                            {getSlider(props, "image", "brightness", "Brightness")}
                            {getSlider(props, "image", "contrast", "Contrast")}
                            {getSlider(props, "image", "saturation", "Saturation")}
                        </div>
                    }

                    <div class="options-group">
                        <span class="header">Dithering</span>
                        {getRadioGroup(props, "image", "dithering", ImageSettings.dithering)}
                    </div>

                    <div class="options-group">
                        <span class="header">Transforms</span>
                        {getCheckbox(props, "image", "flip", "Flip")}
                        {getCheckbox(props, "image", "mirror", "Mirror")}
                        {getCheckbox(props, "image", "descale", "Undo Upscaling")}
                    </div>
                </div>
            </div>
        );
    }

    function MaterialSettingsRow(props: MaterialProps) {
        return (
            <div class="settings-row">
                <h1>Material</h1>
                <div class="options-row">
                    <div class="options-group">
                        <span class="header">Color Matching</span>
                        {getRadioGroup(props, "material", "colorMatch", MaterialSettings.colorMatch)}
                        {getCheckbox(props, "material", "nodupes", "No Duplicates")}
                        {getCheckbox(props, "material", "matchBlackAndWhite", "Improve Black/White")}
                    </div>

                    <div class="options-group">
                        <span class="header">Palette</span>
                        {getRadioGroup(props, "material", "palette", MaterialSettings.palette)}
                    </div>

                    <div class="options-group">
                        <span class="header">Size</span>
                        {getRadioGroup(props, "material", "size", MaterialSettings.size)}
                    </div>
                </div>
            </div>
        );
    }

    function Legend({ partList, image, pitch }: { partList: PartList, image: PartListImage, pitch: number }) {
        return <div class="part-list-container">
            <table class="part-list">
                <thead>
                    <tr>
                        <th colSpan={5} class="top-header">Legend</th>
                    </tr>
                </thead>
                <tbody>
                    {partList.map(ent => {
                        return <tr key={ent.symbol + ent.count + ent.target.name}>
                            <td class="legend-symbol">{ent.symbol}</td>
                            <td class="part-count">{ent.count.toLocaleString()}</td>
                            {ent.target.code && <td class="color-code">{ent.target.code}</td>}
                            <td class="color-swatch" style={{ color: colorEntryToHex(ent.target) }}>⬤</td>
                            <td class="color-name"><span class="colorName">{ent.target.name}</span></td>
                        </tr>
                    })}
                </tbody>
            </table>

            <Stats image={image} pitch={pitch} />
        </div>;
    }

    function Stats({ image, pitch }: { image: PartListImage, pitch: number }) {
        const pixelCount = getImageStats(image).pixels;
        return <table class="plan-stats">
            <thead>
                <tr>
                    <th colSpan={4} class="top-header">Statistics</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="stat-label" rowSpan={3}>Size</td>
                    <td class="stat-value">{image.width.toLocaleString()}×{image.height.toLocaleString()}px</td>
                </tr>
                <tr>
                    <td class="stat-value">{feetInches(image.width * pitch)}×{feetInches(image.height * pitch)}</td>
                </tr>
                <tr>
                    <td class="stat-value">{fmt(image.width * pitch / 10)}×{fmt(image.height * pitch / 10)}cm</td>
                </tr>
                <tr>
                    <td class="stat-label">Pixels</td><td colSpan={4} class="stat-value">{pixelCount.toLocaleString()}</td>
                </tr>
                <tr>
                    <td class="stat-label">Cost (USD)</td><td colSpan={4} class="stat-value">{dollars(pixelCount * 0.002)}</td>
                </tr>
                <tr>
                    <td class="stat-label">Time</td><td colSpan={4} class="stat-value">{timeAmount(pixelCount * 4)}</td>
                </tr>
            </tbody>
        </table>;

        function fmt(n: number) {
            return n.toFixed(1);
        }
    }

    function DisplaySettingsRow(props: DisplayProps) {
        return <div class="settings-row">
            <h1>Plan</h1>
            <div class="options-row">
                <div class="options-group">
                    <span class="header">Legend</span>
                    {getRadioGroup(props, "display", "planStyle", DisplaySettings.planStyle)}
                </div>

                <div class="options-group">
                    <span class="header">Grid</span>
                    {getRadioGroup(props, "display", "grid", DisplaySettings.grid)}
                    {getCheckbox(props, "display", "nudgeGrid", "Nudge Grid")}
                </div>

                <div class="options-group">
                    <span class="header">Background</span>
                    {getRadioGroup(props, "display", "background", DisplaySettings.background)}
                </div>

                <div class="options-group">
                    <span class="header">Comparison</span>
                    {getRadioGroup(props, "display", "refobj", DisplaySettings.refobj)}
                </div>
            </div>
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
            <div class="close-button" onClick={() => updateProp("ui", "isUploadOpen", false)}>✖</div>
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
        return <div class="slider-caption">
            <input type="range" list="image-ticks" class="slider" onChange={changed} min="-10" max="10" step="1" value={props[key]} />
            <span>{label}</span>
        </div>;

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
