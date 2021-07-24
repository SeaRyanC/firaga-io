const request = require("request");

parse("Mini Bulk", "https://www.perler.com/perler-storefront-catalog/products/categories/beads/2000-mini-beads-see-all-colors/");
parse("Main Bulk", "https://www.perler.com/perler-storefront-catalog/products/categories/beads/1000-beads-see-all-colors/");

function parse(name, uri) {
    request(uri, function (error, response, body) {
        let matches = [];
        const rgx = /<a data-variant-code="([\d-]+)"[^$]*?title="(.*)"/g;
        let match;
        while (match = rgx.exec(body)) {
            matches.push([match[1], match[2]]);
        }
        matches.sort((a, b) => a[0] > b[0] ? 1 : -1);
        console.log(name);
        matches.forEach(a => console.log(a[0] + "," + a[1]));
    });
}
