import preact = require('preact');
import { radioGroup, RadioSettings } from "./utils";

export interface PlanSettings extends RadioSettings<typeof PlanSettings> {
    brightness: number;
    contrast: number;
    saturation: number;
    colormatch: "CIEDE2000" | "rgb";
    nodupes: boolean;
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
        ["artkal-mini", "Artkal Mini"],
        ["perler-mini", "Perler Mini"],
        ["perler", "Standard"],
        ["lego", "LEGO ™"]
    ]
} as const;

export function createPlannerSettingsComponent(firedChanged: () => void) {
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
                <span className="header">Transparency</span>
                {radioGroup("transparency", changed, "auto", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Adjustments</span>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="brightness" />Brightness</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="contrast" />Contrast</label>
                <label><input type="range" onInput={changed} onChange={changed} min="-10" max="10" step="1" defaultValue={0} name="saturation" />Saturation</label>
            </div>

            <div className="options-group">
                <span className="header">Color Matching</span>
                <label><input type="radio" onChange={changed} name="colormatch" value="CIEDE2000" defaultChecked={true} />CIEDE200</label>
                <label><input type="radio" onChange={changed} name="colormatch" value="rgb" />RGB</label>
                <label><input type="checkbox" onChange={changed} name="nodupes" />No Duplicates</label>
            </div>

            <div className="options-group">
                <span className="header">Palette</span>
                {radioGroup("palette", changed, "artkal-mini-starter", PlanSettings)}
            </div>

            <div className="options-group">
                <span className="header">Pixel Size</span>
                {radioGroup("size", changed, "artkal-mini", PlanSettings)}
            </div>
        </form>;
    }
}
