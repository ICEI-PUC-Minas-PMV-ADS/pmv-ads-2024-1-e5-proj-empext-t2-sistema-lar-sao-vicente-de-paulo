export interface IModeloRelatorioPiaRespostaOpcao {
  uid?: string;
  opcao: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_modelo_relatorio_pia_resposta?: bigint;
}

export interface IOperationModeloRelatorioPiaRespostaOpcao {
  opcao: string;
  id_modelo_relatorio_pia_resposta: bigint;
}
