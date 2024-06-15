export interface IFichaNutricional {
  id?: bigint;
  uid?: string;
  data_vencimento: Date;
  diagnostico: string;
  especificacao: string;
  alergia_intolerancia: boolean;
  alergia_intolerancia_obs: string;
  observacao: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_idoso: bigint;
  id_usuario: bigint;
}

export interface IOperationFichaNutricional {
  data_vencimento: Date;
  diagnostico: string;
  especificacao: string;
  alergia_intolerancia: boolean;
  alergia_intolerancia_obs: string;
  observacao: string;
  id_idoso: bigint;
  id_usuario: bigint;
}
