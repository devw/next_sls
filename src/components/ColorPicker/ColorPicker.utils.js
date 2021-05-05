export function rgbString(rgbObj) {
  if (!rgbObj) return;

  const { r, g, b, a } = rgbObj;
  return `rgb(${r},${g},${b},${a})`;
}

export function rgbObject(rgbString) {
  if (!rgbString) return ;

  let arr = rgbString
    .replace('rgb(', '')
    .replace(')', '')
    .split(',');

  return {
    r: arr[0],
    g: arr[1],
    b: arr[2],
    a: arr[3]
  }
}