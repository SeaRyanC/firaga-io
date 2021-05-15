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
        ["100/96", "100/96"]
    ],
    carveSize: [
        ["none", "None"],
        ["50", "50x50"]
    ]
} as const;

export function createDownloadBar(onRequest: (settings: PrintOptions) => void) {
    return ({
        component
    });

    function download(s: string) {
        return function (e: any) {
            e.preventDefault();
            onRequest(value());
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
                {radioGroup("color", changed, "bw-min", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Style</span>
                {radioGroup("style", changed, "stepped", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Scale Correction</span>
                {radioGroup("correction", changed, "100/96", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Carve</span>
                {radioGroup("carveSize", changed, "none", PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Printable Underlay</span>
                <label><input type="checkbox" id="dpi-correct" />Correct for 100/96 DPI</label>
                <label><a href="#" onClick={download("pdf")}>Get PDF</a></label>
            </div>
        </form>;
    }
}
