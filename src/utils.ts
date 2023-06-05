export function parse_rgba_string_to_array(rgbaString: string) {
  const rgbaArray = rgbaString
    .replace("rgba(", "")
    .replace(")", "")
    .split(",")
    .map((c) => parseFloat(c));
  rgbaArray[3] = Math.floor(rgbaArray[3] * 255);
  return rgbaArray;
}

const to_2_dp = (num: number) => Math.round(num * 100) / 100;

export function parse_rgba_array_to_string(array: Array<number>) {
  return `rgba(${array[0]}, ${array[1]}, ${array[2]}, ${to_2_dp(
    array[3] / 255
  )})`;
}
