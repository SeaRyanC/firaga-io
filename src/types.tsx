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
};

export type DisplayProps = RadioSettings<typeof DisplaySettings> & {
    nudgeGrid: boolean;
};

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
        tourStage: undefined | number;
        helpTopic: string | undefined;
    };
};

const BuyLink = ({code}: { code: string }) => {
    return <a href={"https://amzn.to/" + code} rel="noreferrer" target="_blank" title="Buy">🛒</a>
};

export const MaterialSettings = {
    palette: [
        ["artkal-mini-starter", <span>Artkal Mini Starter <BuyLink code="3wThLo8"/></span>],
        ["artkal-all-mini", "All Artkal Mini"],
        ["perler-multimix", <span>Perler Multi Mix <BuyLink code="2WjPiLU"/></span>],
        ["perler-all", <span>All Perler <BuyLink code="3kPFwL9"/></span>],
        ["evoretro", <span>Evoretro <BuyLink code="39Lp3kO" /></span>],
        ["funzbo", <span>Funzbo <BuyLink code="3GDH7N3" /></span>],
        ["lego", <span>LEGO <BuyLink code="3omMszN" /></span>],
        ["dmc", <span>DMC <BuyLink code="3D4PRtf" /></span>],
        ["all", "All Colors"]
    ],
    size: [
        ["artkal-mini", <span>Artkal Mini<BuyLink code="3eNjvcm" /></span>],
        ["perler-mini", <span>Perler Mini<BuyLink code="2WcXJIH" /></span>],
        ["perler", <span>Perler<BuyLink code="36U2tov" /></span>],
        ["evoretro", <span>Evoretro<BuyLink code="39Lp3kO" /></span>],
        ["funzbo", <span>Funzbo<BuyLink code="3GDH7N3" /></span>],
        ["16 ct", <span title="16 threads per inch (cross-stitch)">16 ct</span>],
        ["30 ct", <span title="30 threads per inch (cross-stitch)">30 ct</span>],
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
