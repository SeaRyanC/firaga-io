"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlannerSettingsComponent = void 0;
const utils_1 = require("./utils");
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
        ["artkal-mini", "Artkal Mini"],
        ["perler-mini", "Perler Mini"],
        ["perler", "Standard"],
        ["lego", "LEGO ™"]
    ]
};
function createPlannerSettingsComponent(firedChanged) {
    return ({
        component,
        value
    });
    function changed() {
        firedChanged();
    }
    function value() {
        const p = new FormData(document.getElementById("plan-settings-form"));
        const entries = [...p.entries()];
        return Object.fromEntries(entries);
    }
    function component() {
        return <form id="plan-settings-form">
            <div className="options-group">
                <span className="header">Transparency</span>
                {(0, utils_1.radioGroup)("transparency", changed, "auto", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Adjustments</span>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="brightness"/>Brightness</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="contrast"/>Contrast</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="saturation"/>Saturation</label>
            </div>

            <div className="options-group">
                <span className="header">Color Matching</span>
                <label><input type="radio" onChange={changed} name="colormatch" value="CIEDE2000" defaultChecked={true}/>CIEDE200</label>
                <label><input type="radio" onChange={changed} name="colormatch" value="rgb"/>RGB</label>
                <label><input type="checkbox" onChange={changed} name="nodupes"/>No Duplicates</label>
            </div>

            <div className="options-group">
                <span className="header">Palette</span>
                {(0, utils_1.radioGroup)("palette", changed, "artkal-mini-starter", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Pixel Size</span>
                {(0, utils_1.radioGroup)("size", changed, "artkal-mini", PlanSettings)}
            </div>
        </form>;
    }
}
exports.createPlannerSettingsComponent = createPlannerSettingsComponent;
