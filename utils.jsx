"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carveAxis = exports.carve = exports.radioGroup = exports.timer = exports.isBright = exports.hx = exports.colorEntryToHex = exports.colorEntryToHtml = exports.rawToHtml = exports.rgbToRGB = exports.getPitch = exports.pitchInfo = exports.smallSymbolAlphabet = exports.symbolAlphabet = void 0;
exports.symbolAlphabet = "ABCDEFGHJKLMNPQRSTVXZαβΔθλπΦΨΩabcdefghijklmnopqrstuvwxyz0123456789";
exports.smallSymbolAlphabet = "○×★□";
/**
 * Pitch is the center-to-center distance between pegs (in mm). This is
 * slightly larger than the actual bead diameter, so needs to be measured
 * manually and is specific to each manufacturer's pegboard.
 */
exports.pitchInfo = {
    // Measured from 50 pegs @ 138mm
    "artkal-mini": 2.82,
    // Measured from 56 pegs @ 147.8mm
    "perler-mini": 2.69,
    // TODO: Best guess; need actual
    perler: 5.1,
    // https://orionrobots.co.uk/wiki/lego_specifications.html
    lego: 8
};
function getPitch(size) {
    return exports.pitchInfo[size];
}
exports.getPitch = getPitch;
function rgbToRGB(rgb) {
    return {
        R: rgb.r,
        G: rgb.g,
        B: rgb.b
    };
}
exports.rgbToRGB = rgbToRGB;
function rawToHtml(i) {
    return "rgb(" + (i & 0xFF) + "," + ((i >> 8) & 0xFF) + "," + ((i >> 16) & 0xFF) + ")";
}
exports.rawToHtml = rawToHtml;
function colorEntryToHtml(c) {
    return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
}
exports.colorEntryToHtml = colorEntryToHtml;
function colorEntryToHex(c) {
    return "#" + hx(c.r) + hx(c.g) + hx(c.b);
}
exports.colorEntryToHex = colorEntryToHex;
function hx(n) {
    if (n === undefined)
        return "";
    if (n === 0)
        return "00";
    if (n < 16)
        return "0" + n.toString(16);
    return n.toString(16);
}
exports.hx = hx;
function isBright(i) {
    return i.r + i.g * 1.4 + i.b > 460;
}
exports.isBright = isBright;
function timer() {
    let last = Date.now();
    return { mark };
    function mark(event) {
        const n = Date.now();
        // console.log(`PERF: '${event}' finished in ${n - last}ms`);
        last = n;
    }
}
exports.timer = timer;
function radioGroup(name, changed, defaultValue, values) {
    const v = values[name];
    return <>
        {...v.map(([value, caption]) => {
            return <label key={value}><input type="radio" onChange={changed} name={name} value={value} defaultChecked={value === defaultValue}/>{caption}</label>;
        })}
    </>;
}
exports.radioGroup = radioGroup;
function carve(width, height, xSize, ySize) {
    const res = [];
    const xa = carveAxis(width, xSize);
    const ya = carveAxis(height, ySize);
    let cy = 0;
    for (const y of ya) {
        let cx = 0;
        for (const x of xa) {
            res.push({
                x: cx,
                y: cy,
                width: x,
                height: y
            });
            cx += x;
        }
        cy += y;
    }
    return res;
}
exports.carve = carve;
function carveAxis(width, size) {
    if (width <= size)
        return [width];
    if (width <= size * 2) {
        return [Math.ceil(width / 2), Math.floor(width / 2)];
    }
    const remainder = width % size;
    let res = [remainder];
    let remaining = width - res[0];
    while (remaining > size) {
        res.push(size);
        remaining -= size;
    }
    res.push(remaining);
    return res;
}
exports.carveAxis = carveAxis;
function renderRgbaImageToCanvas(quantized, target) {
    target.width = quantized.width;
    target.height = quantized.height;
    const ctx = target.getContext('2d');
    const data = ctx.getImageData(0, 0, quantized.width, quantized.height);
    for (let y = 0; y < quantized.height; y++) {
        for (let x = 0; x < quantized.width; x++) {
            const j = (quantized.width * y + x) * 4;
            const p = quantized.pixels[y][x];
            if (p === -1) {
                data.data[j + 3] = 0;
            }
            else {
                data.data[j + 0] = p & 0xFF;
                data.data[j + 1] = (p >> 8) & 0xFF;
                data.data[j + 2] = (p >> 16) & 0xFF;
                data.data[j + 3] = 255;
            }
        }
    }
    ctx.putImageData(data, 0, 0);
}
function renderPalettizedImageToCanvas(quantized, target) {
    target.width = quantized.width;
    target.height = quantized.height;
    const ctx = target.getContext('2d');
    const data = ctx.getImageData(0, 0, quantized.width, quantized.height);
    for (let y = 0; y < quantized.height; y++) {
        for (let x = 0; x < quantized.width; x++) {
            const j = (quantized.width * y + x) * 4;
            const p = quantized.pixels[y][x];
            if (p === undefined) {
                data.data[j + 3] = 0;
            }
            else {
                data.data[j + 0] = p.r;
                data.data[j + 1] = p.g;
                data.data[j + 2] = p.b;
                data.data[j + 3] = 255;
            }
        }
    }
    ctx.putImageData(data, 0, 0);
}
