"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaterialSettingsComponent = void 0;
const utils_1 = require("./utils");
const types_1 = require("./types");
function createMaterialSettingsComponent(firedChanged) {
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
                <span className="header">Color Matching</span>
                <label><input type="radio" onChange={changed} name="colormatch" value="CIEDE2000" defaultChecked={true}/>CIEDE200</label>
                <label><input type="radio" onChange={changed} name="colormatch" value="rgb"/>RGB</label>
                <label><input type="checkbox" onChange={changed} name="nodupes"/>No Duplicates</label>
            </div>

            <div className="options-group">
                <span className="header">Palette</span>
                {(0, utils_1.radioGroup)("palette", changed, "artkal-mini-starter", types_1.MaterialSettings)}
            </div>

            <div className="options-group">
                <span className="header">Pixel Size</span>
                {(0, utils_1.radioGroup)("size", changed, "artkal-mini", types_1.MaterialSettings)}
            </div>
        </form>;
    }
}
exports.createMaterialSettingsComponent = createMaterialSettingsComponent;
