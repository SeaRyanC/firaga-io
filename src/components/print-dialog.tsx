import * as preact from 'preact';
import { JSX } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { PartListImage, renderPartListImageToDataURL } from '../image-utils';
import { makePdf, PrintSettings } from '../pdf-generator';
import { AppProps, PrintProps } from '../types';
import { getGridSize, getPitch } from '../utils';
import { PropContext } from './context';

export function PrintDialog(props: PrintDialogProps) {
    const updateProp = useContext(PropContext);
    return <div class="print-dialog">
        <h1 class="dialog-title">Print</h1>
        <FormatGroup {...props} />
        <PaperSizeGroup {...props} />
        <ImageSizeGroup {...props} />
        <PageBreakingGroup {...props} />
        {/*
        <div class="print-setting-group">
            <h1>Misc.</h1>
            <label><input type="checkbox" />Use less ink (Step by Step only)</label>
        </div>
        */}
        <div class="final-row">
            <button class="cancel" onClick={() => updateProp("ui", "isPrintOpen", false)}>Cancel</button>
            <button class="print" onClick={() => print()}>Print&nbsp;<img class="pdf-logo" src="./pdf-logo.png" /></button>
        </div>
    </div>;

    function print() {
        const settings: PrintSettings = {
            style: props.settings.format,
            paperSize: props.settings.paperSize,
            breakStrategy: props.settings.breakStrategy,
            imageSize: props.settings.imageSize,
            carveSize: getGridSize(props.gridSize),
            pitch: getPitch(props.gridSize),
            filename: props.filename.replace(".png", ""),
            debug: true
            // perspective: props.settings.perpsective,
        };
        makePdf(props.image, settings);
    }
}

type OptionGroupFactory<K extends keyof AppProps["print"]> = (props: PrintDialogProps) => {
    title: string | JSX.Element;
    key: K;
    values: ReadonlyArray<{
        value: AppProps["print"][K];
        title: string | JSX.Element;
        icon: JSX.Element;
        description: string | JSX.Element;
    }>;
}

export type PrintDialogProps = {
    image: PartListImage;
    settings: PrintProps;
    gridSize: AppProps["material"]["size"];
    filename: string;
};

const FormatGroup = makeRadioGroup(({ image }) => ({
    title: "Format",
    key: "format",
    values: [
        {
            value: "step-by-step",
            title: "Step by Step",
            description: "Print one monochrome grid per color",
            icon: <StepByStepPreviewer image={image} />,
        },
        {
            value: "color",
            title: "Color Image",
            description: "Print a single color image",
            icon: <ColorImagePreviewer image={image} />,
        },
        {
            value: "legend",
            title: "Legend",
            description: "Print a grid of letters corresponding to the legend",
            icon: <SinglePlanPreviewer image={image} />,
        }
    ]
}));

const PaperSizeGroup = makeRadioGroup(() => ({
    key: "paperSize",
    title: "Paper Size",
    values: [
        {
            title: "Letter",
            value: "letter",
            description: "8.5\" x 11\"",
            icon: <span class="letter-icon" />
        },
        {
            title: "A4",
            value: "a4",
            description: "210mm x 297mm",
            icon: <span class="a4-icon" />
        },
    ]
}));

/*
const PerspectiveGroup = makeRadioGroup(() => ({
    key: "perpsective",
    title: "Perspective Correction",
    values: [
        {
            title: "Off",
            value: "off",
            description: "Do not apply perspective correction",
            icon: <PerspectiveArrow amount="off" />
        },
        {
            title: "Low",
            value: "low",
            description: "Slightly skews image so that the dots on the paper and the pegs on the pegboard line up when viewed from an angle other than directly overhead",
            icon: <PerspectiveArrow amount="low" />
        },
        {
            title: "Medium",
            value: "medium",
            description: "Skews image so that the dots on the paper and the pegs on the pegboard line up when viewed from an angle other than directly overhead",
            icon: <PerspectiveArrow amount="medium" />
        },
        {
            title: "High",
            value: "high",
            description: "Aggressively skews image so that the dots on the paper and the pegs on the pegboard line up when viewed from an angle other than directly overhead",
            icon: <PerspectiveArrow amount="high" />
        }
    ]
}));
*/

const ImageSizeGroup = makeRadioGroup(() => ({
    key: "imageSize",
    title: "Image Size",
    values: [
        {
            title: "Page",
            value: "single-page",
            description: "Scale the image to fit a single page",
            icon: <span class="size-stretch">⛶</span>
        },
        {
            title: "Actual",
            value: "actual",
            description: "Print at actual size. Multiple pages will be generated if necessary",
            icon: <span class="size-actual">1:1</span>
        },
        {
            title: "Legible",
            value: "legible",
            description: "Print at a legible size. Multiple pages will be generated if necessary",
            icon: <span class="size-legible">👁</span>
        }
    ]
}));

const PageBreakingGroup = makeRadioGroup(() => ({
    key: "breakStrategy",
    title: "Page Breaking",
    values: [
        {
            title: "Grid",
            value: "grid",
            description: "Split large images based on the pegboard grid size",
            icon: <span class="break-grid">🔳</span>
        },
        {
            title: "Page",
            value: "page",
            description: "Split large images based on the page size",
            icon: <span class="break-paper">📄</span>
        },
    ]
}));

function StepByStepPreviewer(props: { image: PartListImage }) {
    const [frame, setFrame] = useState(0);
    const imgRef = useRef<HTMLImageElement>();
    useEffect(() => {
        drawNextFrame();
        const id = window.setInterval(incrementFrame, 600);
        return () => {
            window.clearInterval(id);
        }
    });

    return <img class="step-by-step-preview" ref={imgRef}>
    </img>;

    function incrementFrame() {
        setFrame((frame + 1) % (props.image.partList.length + 3));
    }

    function drawNextFrame() {
        imgRef.current.src = renderPartListImageToDataURL(props.image, frame);
    }
}

function ColorImagePreviewer(props: { image: PartListImage }) {
    return <img src={renderPartListImageToDataURL(props.image)} />;
}

function SinglePlanPreviewer(props: { image: PartListImage }) {
    const width = 5;
    const height = 4;
    // Grab a region from the center
    const startX = Math.floor(props.image.width / 2) - Math.floor(width / 2);
    const startY = Math.floor(props.image.height / 2) - Math.floor(height / 2);
    const lines = [];
    for (let y = Math.max(startY, 0); y < Math.min(props.image.height, startY + height); y++) {
        let s = '';
        for (let x = Math.max(startX, 0); x < Math.min(props.image.width, startX + width); x++) {
            const px = props.image.partList[props.image.pixels[y][x]];
            s = s + (px?.symbol ?? ' ');
        }
        lines.push(s);
    }
    return <span><pre>{lines.join('\n')}</pre></span>
}

/*
function PerspectiveArrow(props: { amount: "off" | "low" | "medium" | "high" }) {
    const x1 = {
        off: 25,
        low: 20,
        medium: 15,
        high: 5
    }[props.amount];
    return <svg width="50" height="50">
        <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4"
                refX="0" refY="2" orient="auto">
                <polygon points="0 0, 3 2, 0 4" />
            </marker>
        </defs>
        <line x1={x1} y1="5" x2="25" y2="30" stroke="#000" stroke-width="4" marker-end="url(#arrowhead)" />
        <line x1="0" y1="50" x2="50" y2="50" stroke="#000" stroke-width="4" />
    </svg>
}
*/

function makeRadioGroup<K extends keyof PrintProps>(factory: OptionGroupFactory<K>) {
    return function (props: PrintDialogProps) {
        const updateProp = useContext(PropContext);
        const p = factory(props);
        return <div class="print-setting-group">
            <h1>{p.title}</h1>
            <div class="print-setting-group-options">
                {p.values.map(v => <label>
                    <input type="radio"
                        name={p.key}
                        checked={v.value === props.settings[p.key]}
                        onChange={() => {
                            updateProp("print", p.key, v.value);
                        }} />
                    <div class="option">
                        <h3>{v.title}</h3>
                        {v.icon}
                    </div>
                </label>)}
            </div>
            <span class="description">{p.values.filter(v => v.value === props.settings[p.key])[0]?.description}</span>
        </div>;
    };
}