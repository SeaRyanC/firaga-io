import diff  = require("color-diff");
import { ColorEntry } from "./color-data";
import { RgbaImage, InputColorsToObjectColors, PalettizedImage, ObjectColor, ColorAssignment, MaterialProps } from "./types";
import { colorEntryToHex, Rgb } from "./utils";

export function palettize(rgbaArray: RgbaImage, palette: InputColorsToObjectColors): PalettizedImage {
    const pixels = [];
    for (let y = 0; y < rgbaArray.height; y++) {
        const row = [];
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                row.push(undefined);
            } else {
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

export function makePalette(rgbaArray: RgbaImage, allowedColors: readonly ColorEntry[] | undefined, settings: MaterialProps): ColorAssignment[] {
    const tempAssignments: ColorAssignment[] = [];
    const inputColors = [];

    // Collect all colors that need assignment
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const color = rgbaArray.pixels[y][x];
            // Skip transparent
            if (color === -1) continue;
            const extant = inputColors.filter(r => r.color === color)[0];
            if (extant) {
                extant.count++;
            } else {
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

    const diff = colorDiff[settings.colorMatch];
    // Assign each in turn
    for (const inColor of inputColors) {
        if (allowedColors === undefined) {
            let r = inColor.color & 0xFF,
                g = (inColor.color >> 8) & 0xFF,
                b = (inColor.color >> 16) & 0xFF;

            tempAssignments.push({
                color: inColor.color,
                target: {
                    r, g, b,
                    name: colorEntryToHex({ r, g, b }),
                    code: ''
                },
                count: inColor.count
            });
        } else {
            let bestTarget = undefined;
            let bestScore = Infinity;
            for (const c of allowedColors) {
                if (settings.nodupes) {
                    if (tempAssignments.some(t => t.target === c)) continue;
                }

                const score = diff(inColor, c);
                if (score < bestScore) {
                    bestTarget = c;
                    bestScore = score;
                }
            }
            if (bestTarget === undefined) throw new Error("impossible");

            tempAssignments.push({
                color: inColor.color,
                target: bestTarget,
                count: inColor.count,
            });
        }
    }

    return tempAssignments;
}

export const colorDiff = {
    rgb: (lhs: Rgb, rhs: Rgb) => {
        return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    "ciede2000": (lhs: Rgb, rhs: Rgb) => {
        return diff.diff(diff.rgb_to_lab({ R: lhs.r, G: lhs.g, B: lhs.b }), diff.rgb_to_lab({ R: rhs.r, G: rhs.g, B: rhs.b }));
    }
};

