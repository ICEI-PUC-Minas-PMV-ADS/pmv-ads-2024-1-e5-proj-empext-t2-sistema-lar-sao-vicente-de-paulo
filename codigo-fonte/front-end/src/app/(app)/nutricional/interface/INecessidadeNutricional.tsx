export interface INecessidadeNutricional {
  id: number;
  uid: string;
  peso: string;
  peso_tipo: "Atual" | "Estimado" | "Seco";
  peso_obs: string;
  caloria: string;
  caloria_metodo: "FDB" | "Outro";
  //   caloria_fdb: string; remover
  //   caloria_outro: string; remover
  caloria_observacao: string; //adicionar campo no back
  proteina: string;
  proteina_metodo: "Pratico" | "VCT";
  //   proteina_pratico: string; remover
  //   proteina_vct: string; remover
  proteina_observacao: string; //adicionar campo no back
  hidrica: string;
  hidrica_observacao: string;
  criado_em: Date;
  atualizado_em: Date;
  id_ficha_nutricional: number;
}
