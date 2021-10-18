import * as preact from "preact";
import { useContext } from "preact/hooks";
import { PropContext } from './context';


export function WelcomeScreen() {
    const updateProp = useContext(PropContext);

    return <div class="welcome-screen">
        <h1>Welcome to firaga.io!</h1>

        <p><b>firaga</b> is an online tool to help you plan and create real-world pixel art crafts using materials like Perler beads, LEGO, or just regular old paint.</p>

        <p><b>firaga</b> comes preconfigured with color palettes corresponding to many popular crafting products, and uses an advanced color-matching formula to produce the most accurate results.</p>

        {/* segmented rainbow here */}

        <p><b>firaga</b> also makes high-quality, actual-size <b>printable plans</b> for both color and black-and-white printers. Placing one of these plans under a transparent pegboard makes for quick and easy crafting.</p>
        <img src="demo.jpg" class="welcome-pic" />

        {/* photo autocaurosel here */}

        <p>For more info, read <a href="https://firaga.io/help">the documentation</a>, or talk to us on <a href="https://twitter.com/firaga_io">Twitter</a> or <a href="https://github.com/SeaRyanC/firaga-io">GitHub</a>. Happy crafting!</p>

        <button class="cancel" onClick={() => updateProp("ui", "isWelcomeOpen", false)}>Let's go!</button>
    </div>;
}