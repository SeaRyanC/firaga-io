import * as preact from 'preact';
import { useEffect, useRef } from "preact/hooks";
import { PartListEntry, PartListImage } from "../image-utils";
import { AppProps, DisplayProps } from "../types";
import { colorEntryToHtml, isBright, timer } from "../utils";

const svgns = "http://www.w3.org/2000/svg";
declare const require: any;
const svgCss = require("./svg.css");

const refObjs = {
    quarter: {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/44/2014_ATB_Quarter_Obv.png",
        width: 24.26,
        height: 24.26
    },
    dollar: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg",
        width: 156.1,
        height: 66.3
    },
    credit: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/23/CIDSampleAmex.png",
        width: 85.60,
        height: 53.98
    }
} as const;

export function PlanSvg(props: {
    image: PartListImage,
    displaySettings: AppProps["display"],
    pitch: number
}) {
    const {
        image,
        displaySettings
    } = props;
    const {
        planStyle
    } = displaySettings;

    const isBackgroundDark = displaySettings.background === "#000" || displaySettings.background === "#777";

    return <svg class="plan"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`-16 -16 ${(image.width + 1) * 32} ${(image.height + 1) * 32}`}
        preserveAspectRatio="xMidYMid meet">
        <style>{svgCss}</style>

        <defs>
            <rect id="melted" width="32" height="32" rx="7" ry="7"></rect>
            <rect id="square" width="32" height="32"></rect>
            <rect id="circle" width="32" height="32" rx="16" ry="16"></rect>
            <pattern id="wood" patternUnits="userSpaceOnUse" width="400" height="400">
                <image href="https://upload.wikimedia.org/wikipedia/commons/5/50/Mahag%C3%B3ni_001.jpg"
                    x="0" y="0" width="400" height="400" />
            </pattern>
        </defs>

        <BackgroundLayer image={image} bg={displaySettings.background} />
        <ColorLayer image={image} />
        <GridLayer image={image} grid={displaySettings.grid} />
        <TextLayer image={image} planStyle={props.displaySettings.planStyle} isBackgroundDark={isBackgroundDark} />
        <RefObjLayer pitch={props.pitch} name={displaySettings.refobj} />
    </svg>;
}

function BackgroundLayer(props: { image: PartListImage, bg: DisplayProps["background"] }) {
    return <rect x={-16} y={-16} width={(props.image.width + 1) * 32} height={(props.image.height + 1) * 32} fill={props.bg} />;
}

function TextLayer(props: { image: PartListImage, planStyle: DisplayProps["planStyle"], isBackgroundDark: boolean }) {
    const { image, planStyle, isBackgroundDark } = props;

    const textLayer = useRef<SVGGElement>(null!);
    useEffect(() => {
        renderSpans();
    }, [image, planStyle, isBackgroundDark])
    return <g ref={textLayer} />;

    function renderSpans() {
        clearChildren(textLayer.current);
        const target = textLayer.current;
        // Symbols
        if (planStyle === "symbols") {
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const px = image.partList[image.pixels[y][x]];
                    if (px === undefined) continue;

                    const t = document.createElementNS(svgns, "text");
                    t.innerHTML = px.symbol;
                    t.setAttribute("x", (x + 0.5) * 32);
                    t.setAttribute("y", (y + 0.8) * 32);
                    t.setAttribute("text-anchor", "middle");
                    if (isBright(px.target)) {
                        t.setAttribute("class", "bright");
                    } else {
                        t.setAttribute("class", "dark");
                    }
                    target.appendChild(t);
                }
            }
        }

        // Spans
        if (planStyle === "spans" || planStyle === "symbolspans") {
            for (let y = 0; y < image.height; y++) {
                let nowColor = undefined;
                let runCount = 0;
                for (let x = 0; x <= image.width; x++) {
                    const px = image.partList[image.pixels[y][x]];
                    // Running labels
                    if (nowColor === px) {
                        runCount++;
                    } else {
                        if (runCount > 0) {
                            addAt(nowColor, runCount, x, y)
                        }
                        nowColor = px;
                        runCount = 1;
                    }

                    if (x === image.width) break;
                }
            }

            function addAt(px: PartListEntry | undefined, runCount: number, endX: number, y: number) {
                if (planStyle === "spans") {
                    if (runCount < 2) return;
                } else {
                    if (px === undefined) return;
                }

                const t = document.createElementNS(svgns, "text");
                if (planStyle === "spans") {
                    t.innerHTML = runCount.toString();
                } else {
                    const sym = px?.symbol;
                    if (runCount === 1) {
                        t.innerHTML = sym!;
                    } else if (runCount === 2) {
                        t.innerHTML = `${sym}`;
                    } else {
                        t.innerHTML = `${sym}×${runCount.toString()}`;
                    }
                }

                t.setAttribute("x", ((endX - runCount / 2) * 32).toString());
                t.setAttribute("y", ((y + 0.8) * 32).toString());
                t.setAttribute("text-anchor", "middle");
                if (px === undefined ? !props.isBackgroundDark : isBright(px.target)) {
                    t.setAttribute("class", "bright");
                } else {
                    t.setAttribute("class", "dark");
                }
                target.appendChild(t);
            }
        }
    }
}

function GridLayer(props: { image: PartListImage, grid: DisplayProps["grid"] }) {
    const { image, grid } = props;
    const gridLayer = useRef<SVGGElement>(null!);
    useEffect(() => {
        renderGrid();
    }, [image, grid]);
    return <g ref={gridLayer} />;

    function renderGrid() {
        clearChildren(gridLayer.current);

        const target = gridLayer.current;
        // Grid lines
        if (grid !== "none") {
            const gridInterval = +grid;
            for (let y = 0; y <= image.height; y++) {
                const line = document.createElementNS(svgns, "line");
                line.classList.add("gridline");
                line.classList.add(gridInterval < image.height && y % gridInterval === 0 ? "gridmajor" : "gridminor");
                line.setAttribute("x1", -16);
                line.setAttribute("x2", image.width * 32 + 16);
                line.setAttribute("y1", y * 32);
                line.setAttribute("y2", y * 32);
                target.appendChild(line);
            }
            for (let x = 0; x <= image.width; x++) {
                const line = document.createElementNS(svgns, "line");
                line.classList.add(gridInterval < image.width && x % gridInterval === 0 ? "gridmajor" : "gridminor");
                line.setAttribute("x1", x * 32);
                line.setAttribute("x2", x * 32);
                line.setAttribute("y1", -16);
                line.setAttribute("y2", image.height * 32 + 16);
                target.appendChild(line);
            }
        }
    }
}

function ColorLayer(props: { image: PartListImage }) {
    const colorsLayer = useRef<SVGGElement>(null!);
    const { image } = props;

    useEffect(() => {
        clearChildren(colorsLayer.current);
        renderColors(colorsLayer.current!);
    }, [props.image]);

    return <g ref={colorsLayer} />;

    function renderColors(colorLayer: SVGGElement) {
        const { mark } = timer();
        // Color Cells
        // Group per color
        for (let i = 0; i < image.partList.length; i++) {
            const parts: string[] = [];
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    if (image.pixels[y][x] === i) {
                        parts.push(`M ${x * 32} ${y * 32} l 32 0 l 0 32 l -32 0 l 0 -32 z`);
                    }
                }
            }
            const r = document.createElementNS(svgns, "path");
            r.setAttribute("d", parts.join(" "));
            r.setAttribute("fill", colorEntryToHtml(image.partList[i].target));
            r.setAttribute("stroke-width", "1px");
            const title = document.createElementNS(svgns, "title");
            title.innerHTML = `${image.partList[i].target.code} - ${image.partList[i].target.name}`;
            r.appendChild(title);
            colorLayer.appendChild(r);
        }
        mark("Render colors");
    }

}

function RefObjLayer(props: { pitch: number, name: DisplayProps["refobj"] }) {
    if (props.name === "none") {
        return <g></g>;
    }
    const refObj = refObjs[props.name];
    const factor = 32 / props.pitch;
    return <g><image
        href={refObj.url}
        width={refObj.width * factor}
        height={refObj.height * factor}
        opacity={0.8}
        x={0}
        y={0}
    /></g>;
}

function clearChildren(el: SVGElement | undefined) {
    if (el) {
        el.innerHTML = "";
    }
}
