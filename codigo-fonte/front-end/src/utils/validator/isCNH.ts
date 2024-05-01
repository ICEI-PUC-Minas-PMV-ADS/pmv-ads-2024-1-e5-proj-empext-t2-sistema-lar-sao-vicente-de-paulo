export function isCNH(cnh: any) {
  var char1 = cnh.charAt(0);

  if (cnh.replace(/[^\d]/g, "").length !== 11 || char1.repeat(11) === cnh) {
    return false;
  }

  for (var i = 0, j = 9, v = 0; i < 9; ++i, --j) {
    v += +(cnh.charAt(i) * j);
  }

  var dsc = 0,
    vl1 = v % 11;

  if (vl1 >= 10) {
    vl1 = 0;
    dsc = 2;
  }

  for (i = 0, j = 1, v = 0; i < 9; ++i, ++j) {
    v += +(cnh.charAt(i) * j);
  }

  var x = v % 11;
  var vl2 = x >= 10 ? 0 : x - dsc;

  return "" + vl1 + vl2 === cnh.substr(-2);
}
