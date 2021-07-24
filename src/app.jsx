"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radioGroup = exports.createApp = void 0;
const preact = require("preact");
const types_1 = require("./types");
const DefaultAppProps = {
    colorMatch: "ciede2000",
    nodupes: false,
    palette: "artkal-mini-starter",
    size: "artkal-mini"
};
function createApp(initProps = DefaultAppProps, renderTarget) {
    let _props = initProps;
    preact.render(renderApp(_props), renderTarget);
    function updateProp(name, value) {
        _props = { ..._props, [name]: value };
        preact.render(renderApp(_props), renderTarget);
        window.localStorage.setItem("props", JSON.stringify(_props));
    }
    function materialSettingsBar(props) {
        return (<div class="main-row">
                <div className="options-group">
                    <span className="header">Color Matching</span>
                    {getRadioGroup(props, "colorMatch", types_1.MaterialSettings.colorMatch)}
                    {getCheckbox(props, "nodupes", "No Duplicates")}
                </div>
    
                <div className="options-group">
                    <span className="header">Palette</span>
                    {getRadioGroup(props, "palette", types_1.MaterialSettings.palette)}
                </div>
    
                <div className="options-group">
                    <span className="header">Pixel Size</span>
                    {getRadioGroup(props, "size", types_1.MaterialSettings.size)}
                </div>
            </div>);
    }
    function getCheckbox(props, key, label) {
        return <label><input type="checkbox" onChange={changed} checked={props[key]}/>{label}</label>;
        function changed() {
            updateProp(key, !props[key]);
        }
    }
    function getRadioGroup(props, key, settings) {
        return radioGroup(key, (k, v) => updateProp(k, v), props[key], settings);
    }
    function renderApp(props) {
        return (<>
            {materialSettingsBar(props)}
        </>);
    }
}
exports.createApp = createApp;
function radioGroup(name, changed, defaultValue, values) {
    return <>
        {...values.map(([value, caption]) => {
            return <label key={value}><input type="radio" onChange={fireChanged} name={name} value={value} defaultChecked={value === defaultValue}/>{caption}</label>;
            function fireChanged() {
                changed(name, value);
            }
        })}
    </>;
}
exports.radioGroup = radioGroup;
