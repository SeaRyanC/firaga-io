import * as preact from 'preact';
import { ColorEntry } from './color-data';
import { PrintSettings } from './pdf-generator';
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
    pixels: (ColorEntry | undefined)[][];
    width: number;
    height: number;
};

export type InputColorsToObjectColors = ColorAssignment[];
export type ColorAssignment = {
    color: number,
    target: ColorEntry,
    count: number
};

export type ObjectColor = {
    name: string,
    code: string,
    r: number, g: number, b: number
};

export type MaterialProps = RadioSettings<typeof MaterialSettings> & {
    nodupes: boolean;
    matchBlackAndWhite: boolean;
};

export type ImageProps = RadioSettings<typeof ImageSettings> & {
    brightness: number;
    contrast: number;
    saturation: number;

    flip: boolean;
    mirror: boolean;
    descale: boolean;

    keepOutline: boolean;
};

export type PrintProps = {
    format: PrintSettings["style"];
    paperSize: PrintSettings["paperSize"];
    imageSize: PrintSettings["imageSize"];
    breakStrategy: PrintSettings["breakStrategy"];
    // perpsective: "off" | "low" | "medium" | "high";
    // inkSaver: boolean;
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
        isWelcomeOpen: boolean;
        isUploadOpen: boolean;
        isPrintOpen: boolean;
        showLegend: boolean;
        showSettings: boolean;
    };
};

export const MaterialSettings = {
    palette: [
        ["artkal-mini-starter", <span>Artkal Mini Starter <a href="https://amzn.to/3wThLo8" target="_blank" title="Buy">🛒</a></span>],
        ["artkal-all-mini", "All Artkal Mini"],
        ["perler-all", <span>All Perler <a href="https://amzn.to/3kPFwL9" target="_blank" title="Buy">🛒</a></span>],
        ["perler-multimix", <span>Perler Multi Mix <a href="https://amzn.to/2WjPiLU" target="_blank" title="Buy">🛒</a></span>],
        ["evoretro", <span>Evoretro <a href="https://amzn.to/39Lp3kO" target="_blank" title="Buy">🛒</a></span>],
        ["all", "All Colors"]
    ],
    size: [
        ["artkal-mini", <span>Artkal Mini <a href="https://amzn.to/3eNjvcm" target="_blank" title="Buy">🛒</a></span>],
        ["perler-mini", <span>Perler Mini <a href="https://amzn.to/2WcXJIH" target="_blank" title="Buy">🛒</a></span>],
        ["perler", <span>Perler <a href="https://amzn.to/36U2tov" target="_blank" title="Buy">🛒</a></span>],
        ["lego", "LEGO ™"]
    ],
    colorMatch: [
        ["ciede2000", "CIEDE2000"],
        ["ictcp", "ICtCp"],
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
    dithering: [
        ["auto", "Auto"],
        ["on", "On"],
        ["off", "Off"]
    ]
} as const;

export const DisplaySettings = {
    planStyle: [
        ["symbolspans", "Symbols + Spans"],
        ["spans", "Spans"],
        ["symbols", "Symbols"],
        ["none", "None"],
    ],
    grid: [
        ["auto", "Auto"],
        ["50", "50"],
        ["25", "25"],
        ["10", "10"],
        ["none", "None"]
    ],
    background: [
        ["#777", "Grey"],
        ["#000", "Black"],
        ["#FFF", "White"],
        ["url(#checkPattern)", "Checker"],
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
