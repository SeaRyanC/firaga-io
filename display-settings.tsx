import preact = require('preact');
import { radioGroup, RadioSettings } from "./utils";

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
    shaping: [
        ["melted", "Melted"],
        ["square", "Square"],
        ["circle", "Circle"],
        ["none", "None"]
    ],
    refobj: [
        ["none", "None"],
        ["quarter", "Quarter"],
        ["dollar", "Dollar"],
        ["credit", "Bank Card"]
    ]
} as const;

export interface DisplaySettings extends RadioSettings<typeof DisplaySettings> {
}

export function createDisplaySettingsComponent(onChange: () => void) {
    return ({
        component,
        value
    });

    function changed() {
        onChange();
    }

    function value() {
        const p = new FormData(document.getElementById("displaysettingsform") as HTMLFormElement);
        const entries = [...p.entries()];
        return Object.fromEntries(entries) as any as DisplaySettings;
    }

    function component() {
        return <form id="displaysettingsform">
            <div className="options-group">
                <span className="header">Legend</span>
                {radioGroup("planStyle", changed, "symbolspans", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Shape</span>
                {radioGroup("shaping", changed, "melted", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Grid</span>
                {radioGroup("grid", changed, "50", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Background</span>
                {radioGroup("background", changed, "#555", DisplaySettings)}
            </div>

            <div className="options-group">
                <span className="header">Comparison</span>
                {radioGroup("refobj", changed, "none", DisplaySettings)}
            </div>
        </form>;
    }
}
