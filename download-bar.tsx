import preact = require('preact');
import { radioGroup, RadioSettings } from './utils';

export interface PrintOptions extends RadioSettings<typeof PrinterSettings> {
    //paperSize: "fit" | "A4" | "letter";
    //carveSize: [number, number];
}
export const PrinterSettings = {
    paperSize: [
        ["letter", "Letter"],
        ["A4", "A4"],
        ["fit", "Fit"]
    ],
    style: [
        ["stepped", "Step-by-Step"],
        ["single", "Single Plan"]
    ],
    color: [
        ["bw-min", "Monochrome (ink-saver)"],
        ["bw-max", "Monochrome"],
        ["color", "Color"]
    ],
    correction: [
        ["1", "None"],
        ["1.04166667", "104.2%"]
    ],
    skew: [
        ["none", "None"],
        ["low", "Low"],
        ["medium", "Medium"],
        ["high", "High"]
    ],
    carveSize: [
        ["none", "None"],
        ["50", "50x50"]
    ]
} as const;

export function createDownloadBar(onRequest: (name: string, settings: PrintOptions) => void) {
    return ({
        component
    });

    function download(s: string) {
        return function (e: any) {
            e.preventDefault();
            onRequest(s, value());
        }
    }

    function changed() {
        // no-op for now
    }

    function value() {
        const p = new FormData(document.getElementById("printsettingsform") as HTMLFormElement);
        const entries = [...p.entries()];
        return Object.fromEntries(entries) as any as PrintOptions;
    }

    function component() {
        return <form id="printsettingsform">
            <div className="options-group">
                <span className="header">Plan Images</span>
                <label><a href="#" onClick={download("svg")}>SVG</a></label>
                <label><a href="#" onClick={download("txt")}>Text</a></label>
                <label><a href="#" onClick={download("png")}>PNG</a></label>
            </div>

            <div className="options-group">
                <span className="header">Page Size</span>
                {radioGroup("paperSize", changed, "letter", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Color</span>
                {radioGroup("color", changed, "bw-max", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Style</span>
                {radioGroup("style", changed, "stepped", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Scale Correction</span>
                {radioGroup("correction", changed, "1.04166667", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Perspective Correction</span>
                {radioGroup("skew", changed, "none", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Segmenting</span>
                {radioGroup("carveSize", changed, "none", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Printable Underlay</span>
                <label><a href="#" onClick={download("pdf")}>Get PDF</a></label>
                <label><a href="#" onClick={download("calibration")}>Get Calibration Sheet</a></label>
            </div>
        </form>;
    }
}
