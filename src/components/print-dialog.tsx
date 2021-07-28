import * as preact from 'preact';
import { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { PartListImage, renderPartListImageToDatURL } from '../image-utils';
import { AppProps } from '../types';

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

const FormatGroup: OptionGroupFactory<"format"> = ({image}) => ({
    title: "Format",
    key: "format",
    values: [
        {
            value: "step-by-step",
            title: "Step by Step",
            description: "Do a thing",
            icon: <StepByStepPreviewer image={image} />,
        },
        {
            value: "color",
            title: "Color Image",
            description: "Do a thing",
            icon: <ColorImagePreviewer image={image} />,
        },
        {
            value: "legend",
            title: "Legend",
            description: "Do a thing",
            icon: <SinglePlanPreviewer image={image} />,
        }
    ]
});

export type PrintDialogProps = {
    image: PartListImage;
};

export function PrintDialog(props: PrintDialogProps) {
    return <div class="print-dialog">
        <h1 class="dialog-title">Print</h1>
        <div class="print-setting-group">
            <h1>Format</h1>
            <div class="print-setting-group-options">
                <label>
                    <input type="radio" name="format"></input>
                    <div class="option">
                        <h3>Step by Step</h3>
                        <StepByStepPreviewer image={props.image} />
                    </div>
                </label>
                <label>
                    <input type="radio" name="format"></input>
                    <div class="option">
                        <h3>Color Image</h3>
                        <ColorImagePreviewer image={props.image} />
                    </div>
                </label>
                <label>
                    <input type="radio" name="format"></input>
                    <div class="option">
                        <h3>Legend Plan</h3>
                        <SinglePlanPreviewer image={props.image} />
                    </div>
                </label>
            </div>
            <span class="description">
                Does a thing for a person
            </span>
        </div>
        <div class="print-setting-group">
            <h1>Paper Size</h1>
            <div class="print-setting-group-options">
                <label>
                    <input type="radio" name="paper-size"></input>
                    <div class="option">
                        <h3>Letter</h3>
                        <span class="letter-icon" />
                        8.5x11
                    </div>
                </label>
                <label>
                    <input type="radio" name="paper-size"></input>
                    <div class="option">
                        <h3>A4</h3>
                        <span class="a4-icon" />
                        210x297
                    </div>
                </label>
            </div>
        </div>
        <div class="print-setting-group">
            <h1>Perspective Correction</h1>
            <div class="print-setting-group-options">
                <label tabIndex={0}>
                    <input type="radio" name="persp-corr" />
                    <div class="option">
                        <h3>Off</h3>
                        <PerspectiveArrow amount="off" />
                    </div>
                </label>
                <label tabIndex={0}>
                    <input type="radio" name="persp-corr" />
                    <div class="option">
                        <h3>Low</h3>
                        <PerspectiveArrow amount="low" />
                    </div>
                </label>
                <label tabIndex={0}>
                    <input type="radio" name="persp-corr" />
                    <div class="option">
                        <h3>Medium</h3>
                        <PerspectiveArrow amount="medium" />
                    </div>
                </label>
                <label tabIndex={0}>
                    <input type="radio" name="persp-corr" />
                    <div class="option">
                        <h3>High</h3>
                        <PerspectiveArrow amount="high" />
                    </div>
                </label>
            </div>
            <span class="description">
                Perspective correction slightly skews the image
                so that the dots on the paper and the pegs on the
                pegboard line up when viewed from an angle other
                than directly overhead.
            </span>
        </div>
        <div class="print-setting-group">
            <h1>Image Size</h1>
            <div class="print-setting-group-options">
                <label tabIndex={0}>
                    <input type="radio" name="print-size" />
                    <div class="option">
                        <h3>Fit to Page</h3>
                        <span class="stretch">⛶</span>
                    </div>
                </label>
                <label tabIndex={0}>
                    <input type="radio" name="print-size" />
                    <div class="option">
                        <h3>Actual Size</h3>
                        <span class="actual-size">1:1</span>
                    </div>
                </label>
            </div>
        </div>
        <div class="print-setting-group">
            <h1>Misc.</h1>
            <label><input type="checkbox" />Use less ink (Step by Step only)</label>
        </div>
        <div class="final-row">
            <button class="cancel" onClick={() => updateProp("ui", "isPrintOpen", false)}>Cancel</button>
            <button class="print">Print&nbsp;<img class="pdf-logo" src="./pdf-logo.png" /></button>
        </div>
    </div>;
}

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
        imgRef.current.src = renderPartListImageToDatURL(props.image, frame);
    }
}

function ColorImagePreviewer(props: { image: PartListImage }) {
    return <img src={renderPartListImageToDatURL(props.image)} />;
}

function SinglePlanPreviewer(props: { image: PartListImage }) {
    const width = 10;
    const height = 5;
    // Grab a region from the center
    const startX = Math.floor(props.image.width / 2) - Math.floor(width / 2);
    const startY = Math.floor(props.image.height / 2) - Math.floor(height / 2);
    const lines = [];
    for (let y = Math.max(startY, 0); y < Math.min(props.image.height, startY + height); y++) {
        let s = '';
        for (let x = Math.max(startX, 0); x < Math.min(props.image.width, startX + width); x++) {
            s = s + (props.image.pixels[y][x]?.symbol ?? ' ');
        }
        lines.push(s);
    }
    return <span><pre>{lines.join('\n')}</pre></span>
}

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
