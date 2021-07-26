import preact = require('preact');
import { radioGroup, RadioSettings } from "./utils";

export interface ImageSettings extends RadioSettings<typeof ImageSettings> {
    brightness: number;
    contrast: number;
    saturation: number;

    flip: boolean,
    mirror: boolean,
    repixelate: boolean,
}

const ImageSettings = {
    transparency: [
        ["auto", "Auto"],
        ["alpha", "Alpha Channel"],
        ["magenta", "Magenta"],
        ["corners", "Corners"],
        ["none", "None"]
    ],
} as const;

export function createImageSettingsComponent(firedChanged: () => void) {
    return ({
        component,
        value
    });

    function changed() {
        firedChanged();
    }

    function value() {
        const p = new FormData(document.getElementById("image-settings-form") as HTMLFormElement);
        const entries = [...p.entries()];
        return Object.fromEntries(entries) as any as ImageSettings;
    }

    function component() {
        return <form id="image-settings-form">
            <div className="options-group">
                <span className="header">Transparency</span>
                {radioGroup("transparency", changed, "auto", ImageSettings)}
            </div>

            <div className="options-group">
                <span className="header">Adjustments</span>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" name="brightness" />Brightness</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" name="contrast" />Contrast</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" name="saturation" />Saturation</label>
            </div>

            <div className="options-group">
                <span className="header">Transform</span>
                <label><input type="checkbox" onChange={changed} name="mirror" />Mirror</label>
                <label><input type="checkbox" onChange={changed} name="flip" />Flip</label>
                <label><input type="checkbox" onChange={changed} name="repixelate" />Re-pixelate</label>
            </div>
        </form>;
    }
}
