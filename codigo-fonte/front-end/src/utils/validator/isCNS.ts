export function isCNS(cns: string) {
  // Formulário que contem o campo CNS
  var soma: any = new Number();
  var resto: any = new Number();
  var dv = new Number();
  var pis = new String();
  var resultado = new String();
  var tamCNS = cns.length;
  if (tamCNS != 15) {
    return false;
  }
  pis = cns.substring(0, 11);
  soma =
    Number(pis.substring(0, 1)) * 15 +
    Number(pis.substring(1, 2)) * 14 +
    Number(pis.substring(2, 3)) * 13 +
    Number(pis.substring(3, 4)) * 12 +
    Number(pis.substring(4, 5)) * 11 +
    Number(pis.substring(5, 6)) * 10 +
    Number(pis.substring(6, 7)) * 9 +
    Number(pis.substring(7, 8)) * 8 +
    Number(pis.substring(8, 9)) * 7 +
    Number(pis.substring(9, 10)) * 6 +
    Number(pis.substring(10, 11)) * 5;
  resto = soma % 11;
  dv = 11 - resto;
  if (dv == 11) {
    dv = 0;
  }
  if (dv == 10) {
    soma =
      Number(pis.substring(0, 1)) * 15 +
      Number(pis.substring(1, 2)) * 14 +
      Number(pis.substring(2, 3)) * 13 +
      Number(pis.substring(3, 4)) * 12 +
      Number(pis.substring(4, 5)) * 11 +
      Number(pis.substring(5, 6)) * 10 +
      Number(pis.substring(6, 7)) * 9 +
      Number(pis.substring(7, 8)) * 8 +
      Number(pis.substring(8, 9)) * 7 +
      Number(pis.substring(9, 10)) * 6 +
      Number(pis.substring(10, 11)) * 5 +
      2;
    resto = soma % 11;
    dv = 11 - resto;
    resultado = pis + "001" + String(dv);
  } else {
    resultado = pis + "000" + String(dv);
  }
  if (cns != resultado) {
    return false;
  } else {
    return true;
  }
}
