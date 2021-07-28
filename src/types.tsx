import * as preact from 'preact';
import { RadioSettings } from "./utils";

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

export type MaterialProps = RadioSettings<typeof MaterialSettings> & {
    nodupes: boolean;
};

export type ImageProps = RadioSettings<typeof ImageSettings> & {
    brightness: number;
    contrast: number;
    saturation: number;

    flip: boolean;
    mirror: boolean;
    repixelate: boolean;
};

export type PrintProps = {
    format: "step-by-step" | "color" | "legend";
    paperSize: "letter" | "a4";
    perpsective: "off" | "low" | "medium" | "high";
    imageSize: "fit" | "actual";
    inkSaver: boolean;
}

export type DisplayProps = RadioSettings<typeof DisplaySettings>;

export type AppProps = {
    material: MaterialProps;
    print: PrintProps;
    display: DisplayProps;
    image: ImageProps;
    source: {
        uri: string;
        displayName: string;
        _decoded: ImageData | undefined;
    };
    ui: {
        isUploadOpen: boolean;
        isPrintOpen: boolean;
        showLegend: boolean;
        showSettings: boolean;
    };
};

export const MaterialSettings = {
    palette: [
        ["artkal-mini-starter", <span>Artkal Mini Starter Set <a href="https://amzn.to/3wThLo8" target="_blank" title="Buy">🛒</a></span>],
        ["artkal-all-mini", "All Artkal Mini"],
        // ["perler-all", "All Perler"],
        // ["webcolors", "Web Colors"],
        ["all", "All Colors"]
    ],
    size: [
        ["artkal-mini", <span>Artkal Mini <a href="https://amzn.to/3eNjvcm" target="_blank" title="Buy">🛒</a></span>],
        ["perler-mini", <span>Perler Mini<a href="https://amzn.to/2WcXJIH" target="_blank" title="Buy">🛒</a></span>],
        ["perler", <span>Perler <a href="https://amzn.to/36U2tov" target="_blank" title="Buy">🛒</a></span>],
        ["lego", "LEGO ™"]
    ],
    colorMatch: [
        ["ciede2000", "CIEDE2000"],
        ["rgb", "RGB"]
    ]
} as const;

export const ImageSettings = {
    transparency: [
        ["auto", "Auto"],
        ["alpha", "Alpha Channel"],
        ["magenta", "Magenta"],
        ["corners", "Corners"],
        ["none", "None"]
    ],
} as const;

export const DisplaySettings = {
    planStyle: [
        ["symbolspans", "Symbols + Spans"],
        ["spans", "Spans"],
        ["symbols", "Symbols"],
        ["none", "None"],
    ],
    grid: [
        ["56", "56"],
        ["50", "50"],
        ["29", "29"],
        ["28", "28"],
        ["10", "10"],
        ["none", "None"]
    ],
    background: [
        ["#777", "Grey"],
        ["#000", "Black"],
        ["#FFF", "White"],
        ["transparent", "Transparent"],
        ["url(#wood)", "Wood"]
    ],
    /*
    shaping: [
        ["melted", "Melted"],
        ["square", "Square"],
        ["circle", "Circle"],
        ["none", "None"]
    ],
    */
    refobj: [
        ["none", "None"],
        ["quarter", "Quarter"],
        ["dollar", "Dollar"],
        ["credit", "Bank Card"]
    ]
} as const;
