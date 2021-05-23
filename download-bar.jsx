"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDownloadBar = exports.PrinterSettings = void 0;
const utils_1 = require("./utils");
exports.PrinterSettings = {
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
    carveSize: [
        ["none", "None"],
        ["50", "50x50"]
    ]
};
function createDownloadBar(onRequest) {
    return ({
        component
    });
    function download(s) {
        return function (e) {
            e.preventDefault();
            onRequest(s, value());
        };
    }
    function changed() {
        // no-op for now
    }
    function value() {
        const p = new FormData(document.getElementById("printsettingsform"));
        const entries = [...p.entries()];
        return Object.fromEntries(entries);
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
                {(0, utils_1.radioGroup)("paperSize", changed, "letter", exports.PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Color</span>
                {(0, utils_1.radioGroup)("color", changed, "bw-max", exports.PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Style</span>
                {(0, utils_1.radioGroup)("style", changed, "stepped", exports.PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Scale Correction</span>
                {(0, utils_1.radioGroup)("correction", changed, "1.04166667", exports.PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Segmenting</span>
                {(0, utils_1.radioGroup)("carveSize", changed, "none", exports.PrinterSettings)}
            </div>

            <div className="options-group">
                <span className="header">Printable Underlay</span>
                <label><a href="#" onClick={download("pdf")}>Get PDF</a></label>
                <label><a href="#" onClick={download("calibration")}>Get Calibration Sheet</a></label>
            </div>
        </form>;
    }
}
exports.createDownloadBar = createDownloadBar;
