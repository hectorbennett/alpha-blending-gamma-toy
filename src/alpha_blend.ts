export default function alpha_blend(
  bg: Array<number>,
  fg: Array<number>,
  gamma: number
) {
  // convert all our values to floats in the range [0, 1]
  var r_fg = fg[0] / 255.0;
  var g_fg = fg[1] / 255.0;
  var b_fg = fg[2] / 255.0;
  var a_fg = fg[3] / 255.0;

  var r_bg = bg[0] / 255.0;
  var g_bg = bg[1] / 255.0;
  var b_bg = bg[2] / 255.0;
  var a_bg = bg[3] / 255.0;

  if (a_fg == 1 || a_bg == 0) {
    return fg;
  }

  // calculate final alpha
  var a = a_fg + a_bg * (1.0 - a_fg);

  // gamma expand the rgb values
  r_fg = Math.pow(r_fg, gamma);
  g_fg = Math.pow(g_fg, gamma);
  b_fg = Math.pow(b_fg, gamma);

  r_bg = Math.pow(r_bg, gamma);
  g_bg = Math.pow(g_bg, gamma);
  b_bg = Math.pow(b_bg, gamma);

  // calculate final colour channels
  var r = (r_fg * a_fg + r_bg * a_bg * (1.0 - a_fg)) / a;
  var g = (g_fg * a_fg + g_bg * a_bg * (1.0 - a_fg)) / a;
  var b = (b_fg * a_fg + b_bg * a_bg * (1.0 - a_fg)) / a;

  // gamma compress the final colour channels
  r = Math.pow(r, 1.0 / gamma);
  g = Math.pow(g, 1.0 / gamma);
  b = Math.pow(b, 1.0 / gamma);

  // reconvert our floats to be ints in the range [0, 255]
  return [
    Math.round(r * 255.0),
    Math.round(g * 255.0),
    Math.round(b * 255.0),
    Math.round(a * 255.0),
  ];
}
