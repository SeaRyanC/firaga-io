import { Csv, parseCsv } from './csv';

declare const require: any;

export type ColorEntry = {
    r: number;
    g: number;
    b: number;
    name: string;
    code?: string;
};

export type ColorData = {
    sets: ReadonlyArray<ColorSet>;
};

export type ColorSet = {
    name: string;
    colors: ColorEntry[];
}

export function loadColorData(): ColorData {
    const colorDataRaw = parseCsv(require("../data/color-data-new.csv"));
    console.assert(colorDataRaw.headers[0] === "R", "R");
    console.assert(colorDataRaw.headers[1] === "G", "G");
    console.assert(colorDataRaw.headers[2] === "B", "B");
    console.assert(colorDataRaw.headers[3] === "Name", "Name");

    const sets: ColorSet[] = [];
    for (let i = 4; i < colorDataRaw.headers.length; i++) {
        sets.push({
            name: colorDataRaw.headers[i],
            colors: []
        });
    }

    for (const r of colorDataRaw.rows) {
        for (let i = 4; i < r.length; i++) {
            const codeInThisSet = r[i];
            if (codeInThisSet.length) {
                const entry: ColorEntry = {
                    r: parseInt(r[0]),
                    g: parseInt(r[1]),
                    b: parseInt(r[2]),
                    name: r[3]
                };
                if (codeInThisSet !== "1") {
                    entry.code = r[i];
                }
                sets[i - 4].colors.push(entry);
            }
        }
    }

    return { sets };
}
