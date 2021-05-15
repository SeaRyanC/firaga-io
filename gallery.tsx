import preact = require('preact');

type GalleryProps = {
    load: (name: string) => void,
    gallery: string[],
    requestDelete: (index: number) => void
}
export function Gallery({ load, gallery, requestDelete}: GalleryProps) {
    const cells = gallery.map((name, index) => {
        return <GalleryCell
            key={name + '.' + index}
            src={`${name}`}
            onClick={() => load(name)}
            onDeleteClick={() => requestDelete(index)}
        />;
    });
    cells.reverse();
    return (
        <div className="gallery-list">
            {cells}
        </div>
    );
}

function GalleryCell(props: {
    src: string,
    onClick: () => void,
    onDeleteClick: () => void
}) {
    return <div className="gallery-entry" onClick={props.onClick}><img src={props.src} /><div className="gallery-delete" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onDeleteClick();
    }}>❌</div></div>;
}
