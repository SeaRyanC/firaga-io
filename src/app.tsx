import * as preact from 'preact';
import { useRef, useEffect, useLayoutEffect } from 'preact/hooks';
import { Gallery, GalleryProps } from './gallery';
import { adjustImage, createPartListImage, getImageData, getImageData as getImageDataFromImage, getImageStats, imageDataToRgbaArray, ImageStats, palettizeImage, PartList, PartListEntry, PartListImage, renderPartListImageToDataURL } from './image-utils';
import { AppProps, DisplayProps, DisplaySettings, ImageProps, ImageSettings, MaterialProps, MaterialSettings } from "./types";
import { colorEntryToHex, dollars, getPitch, timeAmount } from './utils';
import { createGallery } from './user-gallery';
import { PropContext } from './components/context';
import { PrintDialog } from './components/print-dialog';
import { PlanSvg } from './components/plan-display';

const memoized = {
    adjustImage: memoize(adjustImage),
    palettizeImage: memoize(palettizeImage),
    createPartListImage: memoize(createPartListImage)
};

const galleryStorage = createGallery();

const DefaultAppProps: AppProps = {
    display: {
        background: "#777",
        grid: "auto",
        planStyle: "none",
        refobj: "none",
    },
    image: {
        brightness: 0,
        contrast: 0,
        saturation: 0,

        flip: false,
        mirror: false,
        descale: false,

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
        imageSize: "actual",
        breakStrategy: "grid"
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
            updateProp("source", "uri", uri);
            updateProp("source", "displayName", displayName);
            updateProp("source", "_decoded", data);
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
        const processedRgbaArray = adjustedImageData && imageDataToRgbaArray(adjustedImageData);
        const { palette, quantized } = processedRgbaArray ? memoized.palettizeImage(processedRgbaArray, props.material) : none;
        const image = (palette && quantized) ? memoized.createPartListImage(palette, quantized) : undefined;
        const pitch = getPitch(props.material.size);

        return <div class="app-top">
            <PropContext.Provider value={updateProp}>
                <div class="toolbar">
                    <button class={`toolbar-button ${props.ui.isUploadOpen ? "on" : "off"} text`} onClick={() => toggleProp("ui", "isUploadOpen")}>Open</button>
                    <button class={`toolbar-button ${props.ui.isPrintOpen ? "on" : "off"} text`} onClick={() => toggleProp("ui", "isPrintOpen")}>Print</button>
                    <span class="toolbar-divider" />
                    <button class={`toolbar-button ${props.ui.showSettings ? "on" : "off"} text`} onClick={() => toggleProp("ui", "showSettings")}>Settings</button>
                    <button class={`toolbar-button ${props.ui.showLegend ? "on" : "off"} text`} onClick={() => toggleProp("ui", "showLegend")}>Legend</button>
                    <span class="toolbar-divider" />
                    <a class={`toolbar-button icon`} title="Help" href="https://github.com/SeaRyanC/firaga-io/help.md"><img src="./icons/help.svg" /></a>
                    <a class={`toolbar-button icon`} title="GitHub" href="https://github.com/SeaRyanC/firaga-io"><img src="./icons/github.svg" /></a>
                    <a class={`toolbar-button icon`} title="Twitter" href="https://twitter.com/firaga_io"><img src="./icons/twitter.svg" /></a>
                </div>
                <div class="app-main">
                    {props.ui.showSettings && <div class="settings">
                        <MaterialSettingsRow {...props.material} />
                        <ImageSettingsRow {...props.image} />
                        <DisplaySettingsRow {...props.display} />

                        {!!image && <Stats img={image} pitch={getPitch(props.material.size)} />}
                    </div>}
                    {image ? <PlanSvg image={image} pitch={pitch} displaySettings={props.display} gridSize={props.material.size} /> : <div>Loading...</div>}
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
                    <PrintDialog
                        image={image}
                        settings={props.print}
                        gridSize={props.material.size}
                        filename={props.source.displayName} />}
            </PropContext.Provider>
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
            </div>
        );
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
        const pixelCount = getImageStats(img).pixels;
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
                    <td className="stat-label">Pixels</td><td colSpan={4} className="stat-value">{pixelCount.toLocaleString()}</td>
                </tr>
                <tr>
                    <td className="stat-label">Cost</td><td colSpan={4} className="stat-value">{dollars(pixelCount * 0.001)} - {dollars(pixelCount * 0.003)}</td>
                </tr>
                <tr>
                    <td className="stat-label">Time to Build</td><td colSpan={4} className="stat-value">{timeAmount(pixelCount * 4)}</td>
                </tr>
            </tbody>
        </table>;

        function fmt(n: number) {
            return n.toFixed(2);
        }
    }

    function DisplaySettingsRow(props: DisplayProps) {
        return <div class="settings-row">
            <h1>Plan</h1>
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
