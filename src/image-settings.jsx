"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageSettingsComponent = void 0;
const utils_1 = require("./utils");
const ImageSettings = {
    transparency: [
        ["auto", "Auto"],
        ["alpha", "Alpha Channel"],
        ["magenta", "Magenta"],
        ["corners", "Corners"],
        ["none", "None"]
    ],
};
function createImageSettingsComponent(firedChanged) {
    return ({
        component,
        value
    });
    function changed() {
        firedChanged();
    }
    function value() {
        const p = new FormData(document.getElementById("image-settings-form"));
        const entries = [...p.entries()];
        return Object.fromEntries(entries);
    }
    function component() {
        return <form id="image-settings-form">
            <div className="options-group">
                <span className="header">Transparency</span>
                {(0, utils_1.radioGroup)("transparency", changed, "auto", ImageSettings)}
            </div>

            <div className="options-group">
                <span className="header">Adjustments</span>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="brightness"/>Brightness</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="contrast"/>Contrast</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="saturation"/>Saturation</label>
            </div>

            <div className="options-group">
                <span className="header">Transform</span>
                <label><input type="checkbox" onChange={changed} name="mirror"/>Mirror</label>
                <label><input type="checkbox" onChange={changed} name="flip"/>Flip</label>
                <label><input type="checkbox" onChange={changed} name="repixelate"/>Re-pixelate</label>
            </div>
        </form>;
    }
}
exports.createImageSettingsComponent = createImageSettingsComponent;
