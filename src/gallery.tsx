import preact = require('preact');

export type GalleryProps = {
    load: (name: string, uri: string) => void,
    gallery: readonly (readonly [string, string])[],
    requestDelete: (uri: string) => void
};

export function Gallery(props: GalleryProps) {
    const storage = props.gallery;
    const cells = storage.map(([name, uri], index) => {
        return <GalleryCell
            key={name + '.' + uri}
            alt={`${name}`}
            src={`${uri}`}
            onClick={() => props.load(name, uri)}
            onDeleteClick={() => props.requestDelete(uri)}
        />;
    });
    return (
        <div className="gallery-list">
            {cells}
        </div>
    );
}

function GalleryCell(props: {
    src: string,
    alt: string,
    onClick: () => void,
    onDeleteClick: () => void
}) {
    return <div className="gallery-entry"
        title={props.alt}
        onClick={props.onClick}>
            <img src={props.src} />
            <div className="gallery-delete" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onDeleteClick();
            }}>❌</div></div>;
}
