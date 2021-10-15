const diff = require("color-diff");
const fs = require("fs");

const csv = fs.readFileSync("../data/color-data-new.csv", "utf-8");
const lines = csv.slice(1).split(/\r?\n/g).map(line => line.split(","));

const colors = lines.map(line => ({ r: +line[0], g: +line[1], b: +line[2], name: line[3] }));

console.log(JSON.stringify(colors, undefined, 2));
for (let r = 0; r <= 256; r += 32) {
    for (let g = 0; g <= 256; g += 32) {
        for (let b = 0; b <= 256; b += 32) {
            console.log(`${r}.${g}.${b} = ${diff.closest({r, g, b}, colors).name}`);
        }
    }
}
