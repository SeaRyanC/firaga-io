"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCsv = exports.loadColorData = void 0;
const csv_1 = require("./csv");
function loadColorData() {
    const colorDataRaw = (0, csv_1.parseCsv)(require("../data/colors.csv"));
    const rows = assertCsv(colorDataRaw, ["R", "G", "B", "Artkal Midi Soft", "Artkal Mini Soft", "Artkal Mini", "Artkal Midi", "Name"]);
    const colorData = [];
    for (const r of rows) {
        for (let i = 3; i < r.length - 1; i++) {
            if (r[i].length) {
                colorData.push({
                    name: r[r.length - 1],
                    code: r[i],
                    r: +r[0], R: +r[0],
                    g: +r[1], G: +r[1],
                    b: +r[2], B: +r[2]
                });
            }
        }
    }
    return colorData;
}
exports.loadColorData = loadColorData;
function assertCsv(c, headers) {
    if (JSON.stringify(headers) !== JSON.stringify(c.headers))
        throw new Error("Headers don't match");
    return c.rows;
}
exports.assertCsv = assertCsv;
