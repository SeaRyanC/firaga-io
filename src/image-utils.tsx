import colorConvert = require('color-convert');
import { RgbaImage } from './types';

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

export function getImageData(img: HTMLImageElement) {
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
