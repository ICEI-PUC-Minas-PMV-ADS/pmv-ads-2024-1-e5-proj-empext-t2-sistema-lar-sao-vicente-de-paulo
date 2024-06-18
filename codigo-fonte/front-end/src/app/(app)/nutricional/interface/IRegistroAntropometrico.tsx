//TO DO: criar tabela no back
export interface IRegistroAntropometrico {
  id?: bigint;
  uid?: string;
  criado_em?: Date;
  atualizado_em?: Date;
  data: Date;
  peso: string;
  edema: string;
  ascite: string;
  imc: string;
  imc_classificacao: string;
  cb: string;
  cp: string;
  observacao: string;
  id_ficha_nutricional?: bigint;
}
