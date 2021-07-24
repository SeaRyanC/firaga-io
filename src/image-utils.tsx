import colorConvert = require('color-convert');
import { loadColorData } from './color-data';
import { ImageSettings } from './image-settings';
import { makePalette, palettize } from './palettizer';
import { InputColorsToObjectColors, MaterialProps, ObjectColor, PalettizedImage, RgbaImage } from './types';
import { symbolAlphabet, timer } from './utils';

const colorData = loadColorData();
const artkalStarterCodes =
    ("CT1,C01,C88,C33,C34,C02," +
        "C51,C47,C23,C31,C32,C78," +
        "C22,C44,C07,C09,C05,C57," +
        "C50,C25,C26,C52,C27,C64," +
        "C10,C42,C48,C03,C04,C17," +
        "C12,C13,C14,C86,C15,C70," +
        "C39,C60,C79,C54,C81,C82," +
        "C68,C19,C38,C20,C37,C21").split(",");

export function imageDataToRgbaArray(imageData: ImageData): RgbaImage {
    const raw = [];
    for (let y = 0; y < imageData.height; y++) {
        const row = [];
        for (let x = 0; x < imageData.width; x++) {
            const b = 4 * (y * imageData.width + x);
            if (imageData.data[b + 3] === 255) {
                row.push((imageData.data[b + 2] << 16) + (imageData.data[b + 1] << 8) + imageData.data[b]);
            } else {
                row.push(-1);
            }
        }
        raw.push(row);
    }

    return {
        pixels: raw,
        width: imageData.width,
        height: imageData.height
    };
}

export function applyImageAdjustments(rgbaArray: RgbaImage, brightness: number, contrast: number, saturation: number) {
    if ((brightness === 0) && (contrast === 0) && (saturation === 0)) return;
    const data = rgbaArray.pixels;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            const p = data[y][x];
            if (p === -1) continue;
            const hsv = colorConvert.rgb.hsv(p & 0xFF, (p >> 8) & 0xFF, (p >> 16) & 0xFF);
            // Contrast
            if (contrast > 0) {
                hsv[2] = clamp(0, ((hsv[2] - 50) * (1 + (contrast / 7)) + 50), 100);
            } else if (contrast < 0) {
                hsv[2] = clamp(0, ((hsv[2] - 50) * (1 + (contrast / 10)) + 50), 100);
            }
            // Saturation
            hsv[1] = clamp(0, hsv[1] + saturation * 5, 100);
            // Brightness
            hsv[2] = clamp(0, hsv[2] + brightness * 5, 100);
            const rgb = colorConvert.hsv.rgb(hsv);
            data[y][x] = (rgb[0] | 0) | (rgb[1] << 8) | (rgb[2] << 16);
        }
    }
}

function clamp(min: number, v: number, max: number) {
    return Math.max(min, Math.min(v, max));
}

export function applyTransparencyAndCrop(rgbaArray: RgbaImage, transparentValue: number): RgbaImage {
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] !== transparentValue) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const pixels = [];
    for (let y = minY; y <= maxY; y++) {
        const row = [];
        for (let x = minX; x <= maxX; x++) {
            const v = rgbaArray.pixels[y][x];
            if (v === transparentValue) {
                row.push(-1);
            } else {
                row.push(v);
            }
        }
        pixels.push(row);
    }

    return {
        pixels,
        width: maxX - minX + 1,
        height: maxY - minY + 1
    };
}

export function getImageData(img: HTMLImageElement): ImageData {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    return imageData;
}

export function inferTransparencyValue(rgbaArray: RgbaImage): number {
    let hasEdgeMagenta = false;
    for (let y = 0; y < rgbaArray.height; y++) {
        const isYedge = (y === 0) || (y === rgbaArray.height - 1);
        for (let x = 0; x < rgbaArray.width; x++) {
            if (rgbaArray.pixels[y][x] === -1) {
                // If there's any true transparency, that's it
                return -1;
            }
            const rv = rgbaArray.pixels[y][x];

            // Magenta check
            if (isYedge || (x === 0) || (x === rgbaArray.width - 1)) {
                hasEdgeMagenta = hasEdgeMagenta || rv === 0xFF00FF;
            }
        }
    }
    if (hasEdgeMagenta) return 0xFF00FF;

    // Otherwise use the median color from the corners
    // TODO: Only do this if it's represented more than once
    return getCornerTransparency(rgbaArray);
}

export function getCornerTransparency(rgbaArray: RgbaImage): number {
    const arr = [
        rgbaArray.pixels[0][0],
        rgbaArray.pixels[rgbaArray.height - 1][0],
        rgbaArray.pixels[rgbaArray.height - 1][rgbaArray.width - 1],
        rgbaArray.pixels[0][rgbaArray.width - 1]];
    arr.sort();
    return arr[2];
}

export function adjustImage(imageData: ImageData, imageSettings: ImageSettings) {
    const { mark } = timer();

    const uncroppedRgbaArray = imageDataToRgbaArray(imageData);
    mark("Image -> RGBA");

    let transparency;
    switch (imageSettings.transparency) {
        case "auto":
            mark("Infer transparency");
            transparency = inferTransparencyValue(uncroppedRgbaArray);
            break;
        case "alpha":
            transparency = -1;
            break;
        case "none":
            transparency = NaN;
            break;
        case "magenta":
            transparency = 0xFF00FF;
            break;
        case "corners":
            transparency = getCornerTransparency(uncroppedRgbaArray);
            break;
    }

    const rgbaArray = applyTransparencyAndCrop(uncroppedRgbaArray, transparency);
    mark("Apply transparency & crop");

    applyImageAdjustments(rgbaArray, imageSettings.brightness, imageSettings.contrast, imageSettings.saturation);
    mark("Adjust image");

    return ({
        rgbaArray
    });
}

export function palettizeImage(rgbaArray: RgbaImage, materialSettings: MaterialProps) {
    const { mark } = timer();

    let allowedColors;
    switch (materialSettings.palette) {
        case "artkal-all-mini":
            allowedColors = colorData.filter(c => c.code.startsWith("C"));
            break;
        case "artkal-mini-starter":
            allowedColors = colorData.filter(c => artkalStarterCodes.includes(c.code));
            break;
        case "all":
            allowedColors = undefined;
            break;
        default:
            allowedColors = colorData;
            break;
    }
    const palette = makePalette(rgbaArray, allowedColors, materialSettings);
    mark("Create palette");

    const quantized = palettize(rgbaArray, palette);
    mark("Apply palette");

    return ({
        palette,
        rgbaArray,
        quantized
    });
}

export type PartListImage = {
    pixels: ReadonlyArray<ReadonlyArray<PartListEntry | undefined>>;
    width: number;
    height: number;
    partList: PartList;
}
export function createPartListImage(palette: InputColorsToObjectColors, quantized: PalettizedImage): PartListImage {
    const partList = getPartList(palette);
    const res: (PartListEntry | undefined)[][] = new Array(quantized.height);
    const lookup = new Map<ObjectColor, PartListEntry>();
    for (const e of palette) {
        lookup.set(e.target, partList.filter(p => p.target === e.target)[0]);
    }
    for (let y = 0; y < quantized.height; y++) {
        res[y] = new Array(quantized.width);
        for (let x = 0; x < quantized.width; x++) {
            if (quantized.pixels[y][x] === undefined) {
                res[y][x] = undefined;
            } else {
                res[y][x] = lookup.get(quantized.pixels[y][x]!);
            }
        }
    }
    return ({
        pixels: res,
        width: quantized.width,
        height: quantized.height,
        partList
    });
}

export type PartListEntry = {
    target: ObjectColor,
    symbol: string,
    count: number
};

export type PartList = ReadonlyArray<PartListEntry>;
export function getPartList(palette: InputColorsToObjectColors): PartList {
    const res = [];
    for (const ent of palette) {
        const extant = res.filter(e => e.target === ent.target)[0];
        if (extant) {
            extant.count += ent.count;
        } else {
            res.push({ count: ent.count, target: ent.target, symbol: "#" });
        }
    }

    res.sort((a, b) => b.count - a.count);
    // Assign symbols
    for (let i = 0; i < res.length; i++) {
        res[i].symbol = symbolAlphabet[i];
    }
    return res;
}

export type ImageStats = {
    pixels: number;
};
export function getImageStats(image: PartListImage) {
    return {
        pixels: image.partList.reduce((a, b) => a + b.count, 0)
    }
}