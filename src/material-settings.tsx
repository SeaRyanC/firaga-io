import preact = require('preact');
import { radioGroup, RadioSettings } from "./utils";
import { MaterialSettings } from './types';

export function createMaterialSettingsComponent(firedChanged: () => void) {
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
        return Object.fromEntries(entries) as any as MaterialSettings;
    }

    function component() {
        return <form id="plan-settings-form">
            <div className="options-group">
                <span className="header">Color Matching</span>
                <label><input type="radio" onChange={changed} name="colormatch" value="CIEDE2000" defaultChecked={true} />CIEDE200</label>
                <label><input type="radio" onChange={changed} name="colormatch" value="rgb" />RGB</label>
                <label><input type="checkbox" onChange={changed} name="nodupes" />No Duplicates</label>
            </div>

            <div className="options-group">
                <span className="header">Palette</span>
                {radioGroup("palette", changed, "artkal-mini-starter", MaterialSettings)}
            </div>

            <div className="options-group">
                <span className="header">Pixel Size</span>
                {radioGroup("size", changed, "artkal-mini", MaterialSettings)}
            </div>
        </form>;
    }
}
