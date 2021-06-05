import { Csv, parseCsv } from './csv';
import { ObjectColor } from './types';

declare const require: any;

export function loadColorData(): ReadonlyArray<ObjectColor> {
    const colorDataRaw = parseCsv(require("../data/colors.csv"));
    const rows = assertCsv<[string, string, string, string, string, string, string, string]>(colorDataRaw, ["R", "G", "B", "Artkal Midi Soft", "Artkal Mini Soft", "Artkal Mini", "Artkal Midi", "Name"]);
    const colorData: ObjectColor[] = [];
    for (const r of rows) {
        for (let i = 3; i < r.length - 1; i++) {
            if (r[i].length) {
                colorData.push({
                    name: r[r.length - 1],
                    code: r[i],
                    r: +r[0], R: +r[0],
                    g: +r[1], G: +r[1],
                    b: +r[2], B: +r[2]
                });
            }
        }
    }
    return colorData;
}

export function assertCsv<T extends readonly string[]>(c: Csv, headers: T): ReadonlyArray<T> {
    if (JSON.stringify(headers) !== JSON.stringify(c.headers)) throw new Error("Headers don't match");

    return c.rows as ReadonlyArray<T>;
}
