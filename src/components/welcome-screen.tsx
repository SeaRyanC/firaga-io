import * as preact from "preact";
import { useContext } from "preact/hooks";
import { PropContext } from './context';


export function WelcomeScreen() {
    const updateProp = useContext(PropContext);

    return <div class="welcome-screen">
        <h1>Welcome to firaga.io!</h1>

        <p><b>firaga</b> is an online tool to help you plan and create pixel art crafts using materials like Perler beads, cross-stitching, LEGO, or just regular old paint.</p>

        <p><b>firaga</b> comes preconfigured with color palettes corresponding to many popular crafting products, and uses an <b>advanced color-matching</b> formula to produce the most accurate results.</p>

        <p><b>firaga</b> also makes high-quality, actual-size <b>printable plans</b> for both color and black-and-white printers. Placing one of these plans under a transparent pegboard makes for quick and easy crafting.</p>

        <p>For more info, read <a href="https://firaga.io/help">the documentation</a>, or talk to us on <a href="https://twitter.com/firaga_io">Twitter</a> or <a href="https://github.com/SeaRyanC/firaga-io">GitHub</a>. Happy making!</p>

        <button class="cancel" onClick={() => {
            updateProp("ui", "isWelcomeOpen", true);
            updateProp("ui", "tourStage", 0);
        }}>Let's go!</button>
        <button class="cancel" onClick={() => updateProp("ui", "isWelcomeOpen", false)}>Let's go!</button>
    </div>;
}