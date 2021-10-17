import { ColorEntry, loadColorData } from './color-data';
import { colorDiff, makePalette as makeFixedPalette, palettize, surveyColors } from './palettizer';
import { ImageProps, InputColorsToObjectColors, MaterialProps, ObjectColor, PalettizedImage, RgbaImage } from './types';
import { assertNever, ReadonlyToMutableArray, symbolAlphabet, timer } from './utils';

const colorData = loadColorData();

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

export function applyImageAdjustments(image: ImageData, brightnessPct: number, contrastPct: number, saturationPct: number, flip: boolean, mirror: boolean): ImageData {
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
    if (flip) {
        dstContext.scale(1, -1);
        dstContext.translate(0, -image.height);
    }
    if (mirror) {
        dstContext.scale(-1, 1);
        dstContext.translate(-image.width, 0);
    }
    dstContext.drawImage(srcCanvas, 0, 0);
    return dstContext.getImageData(0, 0, image.width, image.height);
}

export function descale(imageData: ImageData) {
    const { mark } = timer();
    const { data, width, height } = imageData;
    for (const scaleChk of [8, 7, 6, 5, 4, 3, 2]) {
        for (let xOffset = 0; xOffset < scaleChk; xOffset++) {
            for (let yOffset = 0; yOffset < scaleChk; yOffset++) {
                let match = true;
                for (let x = xOffset; x < width; x += scaleChk) {
                    for (let y = yOffset; y < height; y += scaleChk) {
                        for (let xi = 1; xi < scaleChk; xi++) {
                            for (let yi = 1; yi < scaleChk; yi++) {
                                if (!areSame(x + xi, y + yi, x, y)) {
                                    match = false;
                                    break;
                                }
                            }
                            if (!match) break;
                        }
                        if (!match) break;
                    }
                    if (!match) break;
                }

                if (match) {
                    const newData = new ImageData(Math.floor((width - xOffset) / scaleChk), Math.floor((height - yOffset) / scaleChk));
                    let c = 0;
                    for (let y = 0; y < newData.height; y++) {
                        for (let x = 0; x < newData.width; x++) {
                            const src = (((y * scaleChk) + yOffset) * width + (x * scaleChk) + xOffset) * 4;
                            const dst = (y * newData.width + x) * 4;
                            newData.data[dst] = data[src];
                            newData.data[dst + 1] = data[src + 1];
                            newData.data[dst + 2] = data[src + 2];
                            newData.data[dst + 3] = data[src + 3];
                        }
                    }
                    mark(`Descale with match ${width}x${height} (${scaleChk} ${xOffset} ${yOffset}) -> ${newData.width}x${newData.height}`)
                    return newData;
                }
            }
        }
    }
    mark("Descale with no match");
    return imageData;

    function areSame(x0: number, y0: number, x1: number, y1: number) {
        if ((x0 >= imageData.width) || (y0 >= imageData.height)) return true;
        const c0 = (y0 * imageData.width + x0) * 4;
        const c1 = (y1 * imageData.width + x1) * 4;
        return data[c0] === data[c1] &&
            data[c0 + 1] === data[c1 + 1] &&
            data[c0 + 2] === data[c1 + 2] &&
            data[c0 + 3] === data[c1 + 3];
    }
}

export function applyTransparencyAndCrop(imageData: ImageData, transparentValue: number, keepOutline: boolean): ImageData {
    const keepArray = new Array(imageData.width * imageData.height);
    let minY = Infinity, maxY = -Infinity;
    let minX = Infinity, maxX = -Infinity;

    if (isNaN(transparentValue)) {
        // No transparency, keep everything
        minX = minY = 0;
        maxX = imageData.width - 1;
        maxY = imageData.height - 1;
        keepArray.fill(true, 0, keepArray.length);
    } else {
        // Measure the bounds
        keepArray.fill(false, 0, keepArray.length);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                const keep = !isTransparent(colorAt(imageData, x, y));
                if (keep) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    keepArray[y * imageData.width + x] = true;
                    if (keepOutline) {
                        // Keep orthogonally-adjacent pixels
                        if (x !== 0) keepArray[y * imageData.width + (x - 1)] = true;
                        if (y !== 0) keepArray[(y - 1) * imageData.width + x] = true;
                        if (x !== imageData.width - 1) keepArray[y * imageData.width + (x + 1)] = true;
                        if (y !== imageData.height - 1) keepArray[(y + 1) * imageData.width + x] = true;
                    }
                }
            }
        }

        // Adjust for outlining
        if (keepOutline) {
            if (minX !== 0) minX--;
            if (minY !== 0) minY--;
            if (maxX !== imageData.width - 1) maxX++;
            if (maxY !== imageData.height - 1) maxY++;
        }
    }

    const newImage = new ImageData(maxX - minX + 1, maxY - minY + 1);
    // Zero out the whole thing
    for (let y = 0; y < newImage.height; y++)
        for (let x = 0; x < newImage.width; x++)
            newImage.data[(y * newImage.width + x) * 4 + 3] = 0;

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const color = colorAt(imageData, x, y);
            const c = ((y - minY) * newImage.width + (x - minX)) * 4;
            if (keepArray[y * imageData.width + x]) {
                newImage.data[c + 0] = (color >> 0) & 0xFF;
                newImage.data[c + 1] = (color >> 8) & 0xFF;
                newImage.data[c + 2] = (color >> 16) & 0xFF;
                newImage.data[c + 3] = 0xFF;
            }
        }
    }
    return newImage;

    function isTransparent(n: number) {
        // No transparency
        if (isNaN(transparentValue)) return false;

        // Alpha channel
        if (transparentValue === 0) {
            return (n >> 24) * 0xFF === 0;
        }

        // Mask to non-alpha and check equality
        return (n & 0xFFFFFF) === (transparentValue & 0xFFFFFF);
    }
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
        colorAt(rgbaArray, 0, rgbaArray.height - 1),
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

export function adjustImage(imageData: ImageData, imageSettings: ImageProps) {
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

    const descaledImageData = imageSettings.descale ? descale(imageData) : imageData;
    const croppedImageData: ImageData = applyTransparencyAndCrop(descaledImageData, transparency, imageSettings.keepOutline);
    mark("Apply transparency & crop");

    // Rescale to max resolution
    const originalSize = [croppedImageData.width, croppedImageData.height] as const;
    const maxSize = isTrueColorImage(croppedImageData, 256) ? 96 : 480;
    const downsize = maxDimension(originalSize, maxSize);
    const rescaledImageData = downsize === originalSize ? croppedImageData : resizeImage(croppedImageData, downsize);

    const adjustedImageData = applyImageAdjustments(rescaledImageData,
        (imageSettings.brightness * 10) + 100,
        (imageSettings.contrast * 10) + 100,
        (imageSettings.saturation * 10) + 100,
        imageSettings.flip,
        imageSettings.mirror);
    mark("Adjust image");

    return adjustedImageData;
}

export function maxDimension(size: readonly [number, number], max: number): readonly [number, number] {
    if (size[0] <= max && size[1] <= max) return size;
    const scale = Math.max(size[0] / max, size[1] / max);
    return [Math.round(size[0] / scale), Math.round(size[1] / scale)];
}

export function palettizeImage(rgbaArray: RgbaImage, materialSettings: MaterialProps, imageProps: ImageProps) {
    const { mark } = timer();

    let allowedColors;
    switch (materialSettings.palette) {
        case "artkal-all-mini":
            allowedColors = colorData.sets.filter(f => f.name === "Artkal Mini")[0].colors;
            break;
        case "artkal-mini-starter":
            allowedColors = colorData.sets.filter(f => f.name === "Artkal Mini Starter")[0].colors;
            break;
        case "perler-all":
            allowedColors = colorData.sets.filter(f => f.name === "All Perler")[0].colors;
            break;
        case "perler-multimix":
            allowedColors = colorData.sets.filter(f => f.name === "Perler Multi Mix")[0].colors;
            break;
        case "evoretro":
            allowedColors = colorData.sets.filter(f => f.name === "EvoRetro")[0].colors;
            break;
        case "all":
            allowedColors = undefined;
            break;
        default:
            assertNever(materialSettings.palette, "Unknown palette");
    }

    const survey = surveyColors(rgbaArray);
    let doDither;
    if (allowedColors === undefined) {
        doDither = false;
    } else if (imageProps.dithering === "auto") {
        doDither = survey.length > 256;
    } else {
        doDither = imageProps.dithering === "on";
    }

    let quantized;
    if (doDither) {
        // TODO: writing allowedColors! here triggers a compiler bug
        quantized = dither(rgbaArray, allowedColors as ColorEntry[]);
    } else {
        const palette = makeFixedPalette(survey, allowedColors, materialSettings);
        mark("Create palette");
        quantized = palettize(rgbaArray, palette);
        mark("Apply palette");
    }

    return ({
        /*palette,*/
        rgbaArray,
        quantized
    });
}

export type PartListImage = {
    pixels: ReadonlyArray<ReadonlyArray<number>>;
    width: number;
    height: number;
    partList: PartList;
}
export function createPartListImage(quantized: PalettizedImage): PartListImage {
    const partList = getPartList(quantized);
    const res: number[][] = new Array(quantized.height);
    const lookup = new Map<ColorEntry, number>();
    for (let i = 0; i < partList.length; i++) {
        lookup.set(partList[i].target, i);
    }
    for (let y = 0; y < quantized.height; y++) {
        res[y] = new Array(quantized.width);
        for (let x = 0; x < quantized.width; x++) {
            const px = quantized.pixels[y][x];
            if (px === undefined) {
                res[y][x] = -1;
            } else {
                res[y][x] = lookup.get(px)!;
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
    target: ColorEntry,
    symbol: string,
    count: number
};

export type PartList = ReadonlyArray<PartListEntry>;
export function getPartList(quantized: PalettizedImage): PartList {
    const lookup = new Map<ColorEntry, PartListEntry>();
    for (let y = 0; y < quantized.height; y++) {
        for (let x = 0; x < quantized.width; x++) {
            const c = quantized.pixels[y][x];
            if (c === undefined) continue;
            const entry = lookup.get(c);
            if (entry === undefined) {
                lookup.set(c, { count: 1, target: c, symbol: "#" });
            } else {
                entry.count++;
            }
        }
    }
    const res: ReadonlyToMutableArray<PartList> = [];
    for (const entry of lookup.entries()) {
        res.push(entry[1]);
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

export function renderPartListImageToDataURL(image: PartListImage, maxPartFrame = Infinity) {
    const buffer = new Uint8ClampedArray(image.width * image.height * 4);
    const partList = image.partList.map(p => p.target);
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const c = (y * image.width + x) * 4;
            const px = image.pixels[y][x];
            if (px !== -1 && px < maxPartFrame) {
                const color = image.partList[px];
                buffer[c + 0] = color.target.r;
                buffer[c + 1] = color.target.g;
                buffer[c + 2] = color.target.b;
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

function resizeImage(imageData: ImageData, downsize: readonly [number, number]): ImageData {
    const src = document.createElement("canvas");
    src.width = imageData.width;
    src.height = imageData.height;
    src.getContext("2d")!.putImageData(imageData, 0, 0);
    const dst = document.createElement("canvas");
    [dst.width, dst.height] = downsize;
    const context = dst.getContext("2d")!;
    context.scale(downsize[0] / imageData.width, downsize[1] / imageData.height);
    context.drawImage(src, 0, 0);
    return context.getImageData(0, 0, downsize[0], downsize[1]);
}

// https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
export function dither(image: RgbaImage, allowedColors: ColorEntry[]): PalettizedImage {
    const perf = timer();
    // Make a fresh copy for each channel since we'll be futzing around anyway
    const chR = image.pixels.map(line => line.map(e => e & 0xFF));
    const chG = image.pixels.map(line => line.map(e => (e >> 8) & 0xFF));
    const chB = image.pixels.map(line => line.map(e => (e >> 16) & 0xFF));
    perf.mark("Create channel arrays");

    const pixels: (ColorEntry | undefined)[][] = new Array(image.height);
    for (let y = 0; y < image.height; y++) {
        pixels[y] = new Array(image.width);
        if (y % 2 === 0) {
            for (let x = 0; x < image.width; x++) {
                quantize(x, y, true);
            }
        } else {
            for (let x = image.width - 1; x >= 0; x--) {
                quantize(x, y, false);
            }
        }
    }
    perf.mark("Dither");
    console.trace();
    return {
        pixels,
        width: image.width,
        height: image.height
    };

    function quantize(x: number, y: number, rightScanning: boolean) {
        if (image.pixels[y][x] === -1) {
            // Transparent, skip
            pixels[y][x] = undefined;
        } else {
            let bestError = Infinity;
            let bestColor: ColorEntry = undefined as never;
            for (const c of allowedColors) {
                // TODO: Use the selected diff algorithm here;
                // add a less-allocating codepath for ciede2000
                const e = colorDiff.rgb2(chR[y][x], chG[y][x], chB[y][x], c);
                // const e = colorDiff.ciede2000({ r: chR[y][x], g: chG[y][x], b: chB[y][x] }, c);
                // const e = colorDiff.ictcp({ r: chR[y][x], g: chG[y][x], b: chB[y][x] }, c);
                if (e < bestError) {
                    bestColor = c;
                    bestError = e;
                }
            }
            pixels[y][x] = bestColor;
            const er = bestColor.r - chR[y][x],
                eg = bestColor.g - chG[y][x],
                eb = bestColor.b - chB[y][x];
            if (rightScanning) {
                applyError(x + 1, y + 0, er, eg, eb, 7 / 16);
                applyError(x - 1, y + 1, er, eg, eb, 3 / 16);
                applyError(x + 0, y + 1, er, eg, eb, 5 / 16);
                applyError(x + 1, y + 1, er, eg, eb, 1 / 16);
            } else {
                applyError(x - 1, y + 0, er, eg, eb, 7 / 16);
                applyError(x + 1, y + 1, er, eg, eb, 3 / 16);
                applyError(x + 0, y + 1, er, eg, eb, 5 / 16);
                applyError(x - 1, y + 1, er, eg, eb, 1 / 16);
            }
        }
    }

    function applyError(x: number, y: number, r: number, g: number, b: number, f: number) {
        if (x < 0 || x >= image.width) return;
        if (y < 0 || y >= image.height) return;
        chR[y][x] -= r * f;
        chG[y][x] -= g * f;
        chB[y][x] -= b * f;
    }
}

export function isTrueColorImage(img: ImageData, threshold: number) {
    const set = new Set<number>();
    let c = 0;
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            set.add(
                (img.data[c + 0] << 0) |
                (img.data[c + 1] << 8) |
                (img.data[c + 2] << 16) |
                (img.data[c + 3] << 24));
            c += 4;
        }
        if (set.size > threshold) return true;
    }
    return false;
}
