declare global {
    export interface Element {
        setAttribute(name: string, value: number): void;
    }
}

export type RgbaImage = {
    pixels: number[][],
    width: number,
    height: number;
};

export type PalettizedImage = {
    pixels: (ObjectColor | undefined)[][];
    width: number;
    height: number;
};

export type InputColorsToObjectColors = ColorAssignment[];
export type ColorAssignment = {
    color: number,
    target: ObjectColor,
    count: number
};

export type ObjectColor = {
    name: string,
    code: string,
    r: number, g: number, b: number,
    R: number, G: number, B: number
};
