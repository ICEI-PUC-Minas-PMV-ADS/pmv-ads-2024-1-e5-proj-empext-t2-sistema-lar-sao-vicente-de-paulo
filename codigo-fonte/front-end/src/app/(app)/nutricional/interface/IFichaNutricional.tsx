export interface IFichaNutricional {
  id: number;
  uid: string;
  data_vencimento: Date;
  diagnostico: string;
  especificacao: string;
  alergia_intolerancia: boolean;
  alergia_intolerancia_obs: string;
  observacao: string;
  criado_em: Date;
  atualizado_em: Date;
  id_idoso: number;
  id_usuario: number;
}

export interface IOperationFichaNutricional {
  data_vencimento: Date;
  diagnostico: string;
  especificacao: string;
  alergia_intolerancia: boolean;
  alergia_intolerancia_obs: string;
  observacao: string;
  id_idoso: number;
  id_usuario: number;
}
