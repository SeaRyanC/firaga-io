"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
function Gallery({ load, gallery, requestDelete }) {
    const cells = gallery.map((name, index) => {
        return <GalleryCell key={name + '.' + index} src={`${name}`} onClick={() => load(name)} onDeleteClick={() => requestDelete(index)}/>;
    });
    cells.reverse();
    return (<div className="gallery-list">
            {cells}
        </div>);
}
exports.Gallery = Gallery;
function GalleryCell(props) {
    return <div className="gallery-entry" onClick={props.onClick}><img src={props.src}/><div className="gallery-delete" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onDeleteClick();
        }}>❌</div></div>;
}
