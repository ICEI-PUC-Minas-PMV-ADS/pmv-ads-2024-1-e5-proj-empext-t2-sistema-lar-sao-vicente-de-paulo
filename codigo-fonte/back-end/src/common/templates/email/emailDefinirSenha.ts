export const emailDefinirSenha = (user: string, url: string) => {
	return `<div
  style="
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    text-align: center;
  "
>
  <div style="width: 100%; padding: 30px 0; background: aliceblue">
    <img
      src="https://uploaddeimagens.com.br/images/004/770/378/original/logo.png?1713149680"
      alt="Sistema de Acompanhamento de Idosos"
      width="250px"
    />
  </div>

  <div style="text-align: left; padding: 20px">
    <p>Olá ${user}, tudo bem?</p>
    <p>Acesse o link abaixo para definir sua senha :</p>
    <a href="${url}" style="font-size: 15px; font-weight: bold; color: dodgerblue">
      ${url}
    </a>
    <p style="padding-top: 20px">
      <strong>Obs:</strong> O link irá inspirar em 30 minutos, após isso será
      necessário solicitar a redefinição de senha novamente.
    </p>
  </div>
</div>
`;
};
