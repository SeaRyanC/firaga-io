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

export function applyImageAdjustments(image: ImageData, brightnessPct: number, contrastPct: number, saturationPct: number): ImageData {
    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = image.width;
    srcCanvas.height = image.height;
    const srcContext = srcCanvas.getContext('2d')!;
    srcContext.putImageData(image, 0, 0);

    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = image.width;
    dstCanvas.height = image.height;
    const dstContext = dstCanvas.getContext('2d')!;
    dstContext.filter = `saturate(${saturationPct}%) brightness(${brightnessPct}%) contrast(${contrastPct}%)`;
    console.log(dstContext.filter);
    dstContext.drawImage(srcCanvas, 0, 0);
    return dstContext.getImageData(0, 0, image.width, image.height);
}

export function applyTransparencyAndCrop(rgbaArray: ImageData, transparentValue: number): ImageData {
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;
    for (let y = 0; y < rgbaArray.height; y++) {
        for (let x = 0; x < rgbaArray.width; x++) {
            if (!isTransparent(colorAt(rgbaArray, x, y))) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const id = new ImageData(maxX - minX + 3, maxY - minY + 3);
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const color = colorAt(rgbaArray, x, y);
            const c = ((y - minY) * id.width + (x - minX)) * 4;
            if (isTransparent(color)) {
                id.data[c + 3] = 0;
            } else {
                id.data[c + 0] = (color >> 0) & 0xFF;
                id.data[c + 1] = (color >> 8) & 0xFF;
                id.data[c + 2] = (color >> 16) & 0xFF;
                id.data[c + 3] = 0xFF;
            }
        }
    }

    function isTransparent(n: number) {
        if (transparentValue === 0) {
            return (n >> 24) * 0xFF === 0;
        }
        return (n & 0xFFFFFF) === (transparentValue & 0xFFFFFF);
    }

    return id;
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

export function inferTransparencyValue(imageData: ImageData): number {
    let hasEdgeMagenta = false;
    for (let y = 0; y < imageData.height; y++) {
        const isYedge = (y === 0) || (y === imageData.height - 1);
        for (let x = 0; x < imageData.width; x++) {
            const c = 4 * (y * imageData.width + x);
            if (imageData.data[c + 3] === 0) {
                // If there's any true transparency, that's it
                return 0;
            }

            // Magenta check
            if (isYedge || (x === 0) || (x === imageData.width - 1)) {
                if (imageData.data[c + 0] === 0xFF &&
                    imageData.data[c + 1] === 0x00 &&
                    imageData.data[c + 2] === 0xFF) {
                        hasEdgeMagenta = true;
                    }
            }
        }
    }
    if (hasEdgeMagenta) return 0xFF00FF;

    // Otherwise use the median color from the corners
    // TODO: Only do this if it's represented more than once
    return getCornerTransparency(imageData);
}

export function getCornerTransparency(rgbaArray: ImageData): number {
    const arr = [
        colorAt(rgbaArray, 0, 0),
        colorAt(rgbaArray, 0, rgbaArray.height- 1),
        colorAt(rgbaArray, rgbaArray.width - 1, 0),
        colorAt(rgbaArray, rgbaArray.width - 1, rgbaArray.height)
    ];
    arr.sort();
    if (arr[1] === arr[2]) {
        return arr[1];
    }
    return 0x000000;
}

function colorAt(img: ImageData, x: number, y: number): number {
    const c = (y * img.width + x) * 4;
    return (
        (img.data[c + 0] << 0) |
        (img.data[c + 1] << 8) |
        (img.data[c + 2] << 16) |
        (img.data[c + 3] << 24)
    );
}

export function adjustImage(imageData: ImageData, imageSettings: ImageSettings) {
    const { mark } = timer();

    mark("Image -> RGBA");

    let transparency;
    switch (imageSettings.transparency) {
        case "auto":
            mark("Infer transparency");
            transparency = inferTransparencyValue(imageData);
            break;
        case "alpha":
            transparency = 0x00000000;
            break;
        case "none":
            transparency = NaN;
            break;
        case "magenta":
            transparency = 0xFFFF00FF;
            break;
        case "corners":
            transparency = getCornerTransparency(imageData);
            break;
    }

    const croppedImageData: ImageData = applyTransparencyAndCrop(imageData, transparency);
    mark("Apply transparency & crop");

    const adjustedImageData = applyImageAdjustments(croppedImageData, (imageSettings.brightness * 10) + 100, (imageSettings.contrast * 10) + 100, (imageSettings.saturation * 10) + 100);
    mark("Adjust image");

    return adjustedImageData;
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

export function renderPartListImageToDatURL(image: PartListImage, maxPartFrame = Infinity) {
    const buffer = new Uint8ClampedArray(image.width * image.height * 4);
    const partList = image.partList.map(p => p.target);
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const c = (y * image.width + x) * 4;
            const px = image.pixels[y][x];
            if (px && partList.indexOf(px.target) < maxPartFrame) {
                buffer[c + 0] = px.target.r;
                buffer[c + 1] = px.target.g;
                buffer[c + 2] = px.target.b;
                buffer[c + 3] = 255;
            } else {
                buffer[c + 3] = 0;
            }
        }
    }
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d')!;
    const data = ctx.createImageData(image.width, image.height);
    data.data.set(buffer);
    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL();
}