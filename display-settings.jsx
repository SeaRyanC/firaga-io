"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDisplaySettingsComponent = void 0;
const utils_1 = require("./utils");
const DisplaySettings = {
    planStyle: [
        ["symbolspans", "Symbols + Spans"],
        ["spans", "Spans"],
        ["symbols", "Symbols"],
        ["none", "None"],
    ],
    grid: [
        ["56", "56"],
        ["50", "50"],
        ["29", "29"],
        ["28", "28"],
        ["10", "10"],
        ["none", "None"]
    ],
    background: [
        ["#555", "Grey"],
        ["#000", "Black"],
        ["#FFF", "White"],
        ["transparent", "Transparent"],
        ["url(#wood)", "Wood"]
    ],
    /*
    shaping: [
        ["melted", "Melted"],
        ["square", "Square"],
        ["circle", "Circle"],
        ["none", "None"]
    ],
    */
    refobj: [
        ["none", "None"],
        ["quarter", "Quarter"],
        ["dollar", "Dollar"],
        ["credit", "Bank Card"]
    ]
};
function createDisplaySettingsComponent(onChange) {
    return ({
        component,
        value
    });
    function changed() {
        onChange();
    }
    function value() {
        const p = new FormData(document.getElementById("displaysettingsform"));
        const entries = [...p.entries()];
        return Object.fromEntries(entries);
    }
    function component() {
        return <form id="displaysettingsform">
            <div className="options-group">
                <span className="header">Legend</span>
                {(0, utils_1.radioGroup)("planStyle", changed, "symbolspans", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Grid</span>
                {(0, utils_1.radioGroup)("grid", changed, "50", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Background</span>
                {(0, utils_1.radioGroup)("background", changed, "#555", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Comparison</span>
                {(0, utils_1.radioGroup)("refobj", changed, "none", DisplaySettings)}
            </div>
        </form>;
    }
}
exports.createDisplaySettingsComponent = createDisplaySettingsComponent;
