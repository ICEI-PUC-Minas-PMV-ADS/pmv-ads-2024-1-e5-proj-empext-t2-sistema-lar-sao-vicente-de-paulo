export interface IModeloRelatorioPiaResposta {
  id: bigint;
  uid: string;
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  criado_em: Date;
  atualizado_em: Date;
  id_modelo_relatorio_pia_pergunta: bigint;
}

export interface IOperationModeloRelatorioPiaResposta {
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  id_modelo_relatorio_pia_pergunta: bigint;
}
