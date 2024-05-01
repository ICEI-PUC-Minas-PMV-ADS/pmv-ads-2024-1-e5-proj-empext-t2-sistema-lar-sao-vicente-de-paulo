export function regexTel(value: string): string {
  const qtdDigitos = value
    ?.replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(" ", "").length;

  value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2");

  if (qtdDigitos > 10) value = value?.replace(/(\d{5})(\d{4})/, "$1-$2");
  else value = value.replace(/(\d{4})(\d{4})/, "$1-$2");

  return value.replace(/(-\d{4})\d+?$/, "$1"); // captura 4 numeros seguidos de um traço e não deixa ser digitado mais nada
}
