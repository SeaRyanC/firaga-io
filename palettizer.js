"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorDiff = exports.makePalette = exports.palettize = void 0;
const diff = require("color-diff");
const utils_1 = require("./utils");
function palettize(rgbaArray, palette) {
    const pixels = [];
    for (let y = 0; y < rgbaArray.height; y++) {
        const row = [];
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                row.push(undefined);
            }
            else {
                const paletteEntry = palette.filter(p => p.color === rgbaArray.pixels[y][x])[0];
                row.push(paletteEntry.target);
            }
        }
        pixels.push(row);
    }
    return {
        pixels,
        width: rgbaArray.width,
        height: rgbaArray.height
    };
}
exports.palettize = palettize;
function makePalette(rgbaArray, allowedColors, settings) {
    const tempAssignments = [];
    const inputColors = [];
    // Collect all colors that need assignment
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const color = rgbaArray.pixels[y][x];
            // Skip transparent
            if (color === -1)
                continue;
            const extant = inputColors.filter(r => r.color === color)[0];
            if (extant) {
                extant.count++;
            }
            else {
                inputColors.push({
                    color,
                    count: 1,
                    r: color & 0xFF,
                    g: (color >> 8) & 0xFF,
                    b: (color >> 16) & 0xFF
                });
            }
        }
    }
    // Sort by most-common colors
    inputColors.sort((a, b) => b.count - a.count);
    const diff = exports.colorDiff[settings.colormatch];
    // Assign each in turn
    for (const r of inputColors) {
        if (allowedColors === undefined) {
            let R = r.color & 0xFF, G = (r.color >> 8) & 0xFF, B = (r.color >> 16) & 0xFF;
            tempAssignments.push({
                color: r.color,
                target: {
                    R, G, B,
                    r: R, g: G, b: B,
                    name: (0, utils_1.colorEntryToHex)({ r: R, g: G, b: B }),
                    code: ''
                },
                count: r.count
            });
        }
        else {
            let bestTarget = undefined;
            let bestScore = Infinity;
            for (const c of allowedColors) {
                if (settings.nodupes) {
                    if (tempAssignments.some(t => t.target === c))
                        continue;
                }
                const score = diff(r, c);
                if (score < bestScore) {
                    bestTarget = c;
                    bestScore = score;
                }
            }
            if (bestTarget === undefined)
                throw new Error("impossible");
            tempAssignments.push({
                color: r.color,
                target: bestTarget,
                count: r.count,
            });
        }
    }
    return tempAssignments;
}
exports.makePalette = makePalette;
exports.colorDiff = {
    rgb: (lhs, rhs) => {
        return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    "CIEDE2000": (lhs, rhs) => {
        return diff.diff(diff.rgb_to_lab({ R: lhs.r, G: lhs.g, B: lhs.b }), diff.rgb_to_lab({ R: rhs.r, G: rhs.g, B: rhs.b }));
    }
};
