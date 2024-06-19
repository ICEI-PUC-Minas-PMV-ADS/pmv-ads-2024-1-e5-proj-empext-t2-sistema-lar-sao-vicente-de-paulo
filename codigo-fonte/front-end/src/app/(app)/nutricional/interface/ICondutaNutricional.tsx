export interface ICondutaNutricional {
  id?: bigint;
  uid?: string;
  data: Date;
  dieta: string;
  volume: string;
  fracionamento: string;
  kcal_dia: string;
  ptn_dia: string;
  agua_ml: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_ficha_nutricional?: bigint;
}
