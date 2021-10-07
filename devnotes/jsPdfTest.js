const jspdf = require("jspdf");
const fs = require("fs");

const doc = new jspdf.jsPDF({
    unit: "mm",
    format: [8.5 * 25.4, 11 * 25.4],
});

const ctx = doc.context2d;

doc.setFont("Helvetica");
doc.setFontSize(12);
doc.setFillColor(0, 0, 0);

const width = ctx.measureText("hello world");
ctx.fillText("hello world", 50, 50);

// Reported width
ctx.strokeRect(50, 55, width.width, 2);
// Correction attempt 1
ctx.strokeRect(50, 60, width.width / 2.8346456, 2);
// Correction attempt 2
ctx.strokeRect(50, 65, width.width / 2.8346456 * (96 / 72), 2);
// Correction attempt 3
ctx.strokeRect(50, 70, width.width / 2.8346456 * (72 / 96), 2);

fs.writeFile("test.pdf", Buffer.from(doc.output("arraybuffer")), () => {});
