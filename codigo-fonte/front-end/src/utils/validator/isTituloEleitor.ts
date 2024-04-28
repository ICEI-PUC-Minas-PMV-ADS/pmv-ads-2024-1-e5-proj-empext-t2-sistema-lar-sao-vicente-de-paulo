function isTituloEleitor(titulo: string) {
  // Remover caracteres não numéricos
  titulo = titulo.replace(/\D/g, "");

  // Verificar se o Título de Eleitor tem 12 dígitos
  if (titulo.length !== 12) {
    return false;
  }

  // Calcular dígito verificador
  let soma = 0;
  const peso = [2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 8; i++) {
    soma += parseInt(titulo.charAt(i)) * peso[i];
  }

  let dv1 = soma % 11;
  if (dv1 === 10) {
    dv1 = 0;
  }

  soma = dv1 * 2;
  for (let i = 8; i < 10; i++) {
    soma += parseInt(titulo.charAt(i)) * peso[i - 8];
  }

  let dv2 = soma % 11;
  if (dv2 === 10) {
    dv2 = 0;
  }

  // Verificar se os dígitos verificadores conferem
  return (
    parseInt(titulo.charAt(10)) === dv1 && parseInt(titulo.charAt(11)) === dv2
  );
}
