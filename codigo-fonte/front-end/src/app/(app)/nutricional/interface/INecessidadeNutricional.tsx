export interface INecessidadeNutricional {
  id?: bigint;
  uid?: string;
  peso: string;
  peso_tipo: "Atual" | "Estimado" | "Seco";
  peso_obs: string;
  caloria: string;
  caloria_metodo: "FDB" | "Outro";
  caloria_observacao: string;
  proteina: string;
  proteina_metodo: "Pratico" | "VCT";
  proteina_observacao: string;
  hidrica: string;
  hidrica_observacao: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_ficha_nutricional?: bigint;
}
