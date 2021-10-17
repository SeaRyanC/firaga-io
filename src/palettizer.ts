import diff  = require("color-diff");
import { ColorEntry } from "./color-data";
import { rgbToICtCp } from "./ictcp";
import { RgbaImage, InputColorsToObjectColors, PalettizedImage, ObjectColor, ColorAssignment, MaterialProps } from "./types";
import { colorEntryToHex, Rgb, timer } from "./utils";

export function palettize(rgbaArray: RgbaImage, palette: InputColorsToObjectColors): PalettizedImage {
    const pixels = [];
    const colorLookup = new Map<number, ColorEntry>();
    for (const p of palette) {
        colorLookup.set(p.color, p.target);
    }

    for (let y = 0; y < rgbaArray.height; y++) {
        const row = [];
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                row.push(undefined);
            } else {
                row.push(colorLookup.get(rgbaArray.pixels[y][x]));
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

export type ColorSurvey = Array<Record<"color" | "count" | "r" | "g" | "b", number>>;
export function surveyColors(rgbaArray: RgbaImage): ColorSurvey {
    const perf = timer();

    const inputColors: ColorSurvey = [];
    const colorToColor = new Map<number, (typeof inputColors)[number]>();

    // Collect all colors that need assignment
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const color = rgbaArray.pixels[y][x];
            // Skip transparent
            if (color === -1) continue;
            if (colorToColor.has(color)) {
                colorToColor.get(color)!.count++;
            } else {
                const entry = {
                    color,
                    count: 1,
                    r: color & 0xFF,
                    g: (color >> 8) & 0xFF,
                    b: (color >> 16) & 0xFF
                };
                inputColors.push(entry);
                colorToColor.set(color, entry);
            }
        }
    }
    perf.mark(`Palette: Survey colors (${inputColors.length}) and counts`);

    return inputColors;
}

export function makePalette(inputColors: ColorSurvey, allowedColors: readonly ColorEntry[] | undefined, settings: MaterialProps): ColorAssignment[] {
    const perf = timer();

    // Override noDuplicates if there are more input colors than target colors
    // TODO: This should bubble up a warning
    const noDuplicates = settings.nodupes && (!allowedColors || (inputColors.length < allowedColors.length));

    const tempAssignments: ColorAssignment[] = [];
    // Sort by most-common colors
    inputColors.sort((a, b) => b.count - a.count);

    const diff = colorDiff[settings.colorMatch];
    // Assign each in turn
    for (const inColor of inputColors) {
        if (allowedColors === undefined) {
            const { r, g, b } = inColor;

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
            // Many sprites in the wild have very high "black" values, e.g.
            // the Gannon sample image's lowest value is #282828. This leads to the color matching
            // algorithms picking weird non-desaturated values or "deep greys" (e.g. Artkal's Pepper)
            // instead of just going with good ol' black. Sprites also sometimes miss true white,
            // again Gannon's top color is #F8F8F8. Mechanically adjust these toward their poles
            // when they're "close enough" and fully desaturated
            let targetColor = inColor;
            if (settings.matchBlackAndWhite && (inColor.r === inColor.g && inColor.g === inColor.b)) {
                let rgb;
                if (inColor.r > 0xD0) {
                    rgb = 255 - (255 - inColor.r) * 0.5;
                } else if (inColor.r < 0x30) {
                    rgb = inColor.r * 0.5;
                } else {
                    rgb = inColor.r;
                }
                targetColor = {
                    ...inColor,
                    r: rgb,
                    b: rgb,
                    g: rgb                    
                };
            }
            console.log(`Find match for ${JSON.stringify(targetColor)}`);
            let bestTarget = undefined;
            let bestScore = Infinity;
            // TODO: This is too slow
            for (const c of allowedColors) {
                if (noDuplicates) {
                    if (tempAssignments.some(t => t.target === c)) continue;
                }

                const score = diff(targetColor, c);
                console.log(`Score of ${c.name} => ${score}`);
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

    perf.mark("Palette: Assign color entries");

    return tempAssignments;
}

export const colorDiff = {
    rgb: (lhs: Rgb, rhs: Rgb) => {
        return Math.pow(lhs.r - rhs.r, 2) * 3 + Math.pow(lhs.g - rhs.g, 2) * 4 + Math.pow(lhs.b - rhs.b, 2) * 2;
    },
    rgb2: (r: number, g: number, b: number, rhs: Rgb) => {
        return Math.pow(r - rhs.r, 2) * 3 + Math.pow(g - rhs.g, 2) * 4 + Math.pow(b - rhs.b, 2) * 2;
    },
    "ciede2000": (lhs: Rgb, rhs: Rgb) => {
        return diff.diff(rgbToLabCached(lhs), rgbToLabCached(rhs));
    },
    "ictcp": (lhs: Rgb, rhs: Rgb) => {
        const a = rgbToICtCp(lhs), b = rgbToICtCp(rhs);
        const di = a[0] - b[0], dct = (a[1] - b[1]) / 2, dcp = a[2] - b[2];
        return di * di + dct * dct + dcp * dcp;
    }
};

function rgbToLabCached(rgb: Rgb): diff.LabColor {
    if ("_lab" in rgb) {
        return (rgb as any)["_lab"];
    }
    return (rgb as any)["_lab"] = diff.rgb_to_lab({ R: rgb.r, G: rgb.g, B: rgb.b });
}
