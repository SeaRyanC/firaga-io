const defaultGallery: [string, string][] = [
    ["Eevee", "eevee"],
    ["Mario 3", "mario-3"],
    ["Megaman X", "megaman_x"],
    ["Earthbound", "earthbound"],
    ["Kirby", "kirby"],
    ["Mushrom", "mushroom"],
    ["Crono", "crono"],
    ["Ghost", "ghost-smw"],
    ["Mew", "mew"],
    ["Caped Mario", "mario-cape"],
    ["Link (NES)", "link-nes"],
    ["Pac-man Ghost", "ghost"],
    ["Link (SNES)", "link"],
    ["Mario (NES)", "mario-1"],
    ["Gannon", "gannon"],
    ["Ken", "ken"],
    ["Shyguy", "shyguy"],
    ["Squirtle", "squirtle"],
    ["Brachiosaur", "brachiosaur"],
    ["Sonic", "sonic"],
    ["Piranha Plant", "smw-plant"],
];

const keyname = "user-gallery";
export type GalleryStorage = ReturnType<typeof createGallery>;
export function createGallery() {
    let current = defaultGallery.map(([name, uri]) => [name, `./gallery/${uri}.png` as string] as const);
    const s = window.localStorage.getItem(keyname);
    if (s !== null) {
        current = JSON.parse(s);
    }

    function add(name: string, uri: string) {
        for (let i = 0; i < current.length; i++) {
            if (current[i][1] === uri) {
                // Already present
                return;
            }
        }
        current = [[name, uri], ...current];

        window.setTimeout(save, 250);
        window.clarity?.("event", "add-user-image");
    }

    function remove(uri: string) {
        for (let i = 0; i < current.length; i++) {
            if (current[i][1] === uri) {
                current.splice(i, 1);
                current = [...current];
            }
        }
    }

    function save() {
        window.localStorage.setItem(keyname, JSON.stringify(current));
    }

    return {
        add,
        remove,
        get current() {
            return current;
        }
    }
}
