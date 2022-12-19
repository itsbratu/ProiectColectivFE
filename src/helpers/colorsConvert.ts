export const hexToRgb = (hex: string): number[] => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return [r, g, b, 0.5];
  }
  return [];
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const blendColors = (base: number[], added: number[]) => {
  var mix = [];
  mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
  mix[0] = Math.round(
    (added[0] * added[3]) / mix[3] +
      (base[0] * base[3] * (1 - added[3])) / mix[3]
  );
  mix[1] = Math.round(
    (added[1] * added[3]) / mix[3] +
      (base[1] * base[3] * (1 - added[3])) / mix[3]
  );
  mix[2] = Math.round(
    (added[2] * added[3]) / mix[3] +
      (base[2] * base[3] * (1 - added[3])) / mix[3]
  );
  return mix;
};

export const getMixedColor = (colors: string[]) => {
  if (colors.length === 2)
    return blendColors(hexToRgb(`#${colors[0]}`), hexToRgb(`#${colors[1]}`));
  var i: number;
  var mix: number[] = blendColors(
    hexToRgb(`#${colors[0]}`),
    hexToRgb(`#${colors[1]}`)
  );
  for (i = 2; i < colors.length; ++i) {
    mix = blendColors(mix, hexToRgb(`#${colors[i]}`));
  }
  return mix;
};
