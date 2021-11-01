import { createApp } from './app';
import { AppProps } from './types';
import { createGallery } from './user-gallery';

const galleryStorage = createGallery();

const DefaultAppProps: AppProps = {
    display: {
        background: "url(#checkPattern)",
        grid: "auto",
        nudgeGrid: true,
        planStyle: "none",
        refobj: "none",
    },
    image: {
        brightness: 0,
        contrast: 0,
        saturation: 0,

        flip: false,
        mirror: false,
        descale: true,

        dithering: "auto",

        transparency: "auto",
        keepOutline: false
    },
    material: {
        colorMatch: "ictcp",
        nodupes: false,
        palette: "perler-multimix",
        size: "perler",
        matchBlackAndWhite: true
    },
    print: {
        paperSize: "letter",
        format: "step-by-step",
        imageSize: "actual",
        breakStrategy: "page"
    },
    source: {
        displayName: galleryStorage.current[0][0],
        uri: galleryStorage.current[0][1],
        _decoded: undefined as undefined | ImageData
    },
    ui: {
        isUploadOpen: false,
        isPrintOpen: false,
        isWelcomeOpen: true,
        showLegend: false,
        showSettings: false,
        tourStage: undefined
    }
} as const;

window.addEventListener("DOMContentLoaded", function () {
    const s = window.localStorage.getItem("props");
    let props;
    if (s === null) {
        props = DefaultAppProps;
    } else {
        props = JSON.parse(s);
    }
    try {
        createApp(props, galleryStorage, document.body);
    } catch (e) {
        window.localStorage.clear();
        console.error(e);
        props = DefaultAppProps;
        createApp(props, galleryStorage, document.body);
    }
});
