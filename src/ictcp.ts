const m1 = 2610 / 16384;

// const testValue = { r: 255, g: 0, b: 0 };
// const [I, Ct, Cp] = rgbToICtCp(testValue);
// console.log(`I ${I} Ct ${Ct} Cp ${Cp}`);

function PQ(L: number, M: number, S: number): readonly [number, number, number] {
  return [PQf(L), PQf(M), PQf(S)] as const;
}

function PQf(n: number) {
  let num = 3424 / 4096 + (2413 / 128) * Math.pow(n / 10000, m1);
  let denom = 1 + (2392 / 128) * Math.pow(n / 10000, m1);
  return Math.pow(
    (3424 / 4096 + (2413 / 128) * Math.pow(n / 10000, m1)) /
      (1 + (2392 / 128) * Math.pow(n / 10000, m1)),
    2523 / 32
  );
}

// r, g, b 0-255
function rgbToXyz(r: number, g: number, b: number): readonly [number, number, number] {
  r = sRGBtoLinearRGB(r / 255);
  g = sRGBtoLinearRGB(g / 255);
  b = sRGBtoLinearRGB(b / 255);
  const X = 0.4124 * r + 0.3576 * g + 0.1805 * b;
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;
  return [X, Y, Z];
}

function xyzToXYZa(xyz: readonly [number, number, number]): readonly [number, number, number] {
  return xyz.map((n) => Math.max(n * 203, 0)) as [number, number, number];
}

function sRGBtoLinearRGB(color: number): number {
  if (color <= 0.04045) {
    return color / 12.92;
  }
  return Math.pow((color + 0.055) / 1.055, 2.4);
}

export function rgbToICtCp(arg: { r: number; g: number; b: number }): readonly [number, number, number] {
  const xyz = rgbToXyz(arg.r, arg.g, arg.b);
  // console.log(`X ${xyz[0]} Y ${xyz[1]} Z ${xyz[2]}`);
  const xyza = xyzToXYZa(xyz);
  // This is nominally R/G/B but is actually X/Y/Z
  const [R, G, B] = xyza;
  // console.log(`Xa ${R} Ya ${G} Za ${B}`);

  const L = 0.3592 * R + 0.6976 * G - 0.0358 * B;
  const M = -0.1922 * R + 1.1004 * G + 0.0755 * B;
  const S = 0.007 * R + 0.0749 * G + 0.8434 * B;

  // console.log(`L ${L} M ${M} S ${S}`);

  const [Lp, Mp, Sp] = PQ(L, M, S);

  // console.log(`L' ${Lp} M' ${Mp} S' ${Sp}`);

  const I = 0.5 * Lp + 0.5 * Mp;
  const Ct = (6610 * Lp - 13613 * Mp + 7003 * Sp) / 4096;
  const Cp = (17933 * Lp - 17390 * Mp - 543 * Sp) / 4096;
  return [I, Ct, Cp];
}
