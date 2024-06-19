export interface IRelatorioPiaRespostaOpcao {
  uid?: string;
  opcao: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_relatorio_pia_resposta?: bigint;
}

export interface IOperationRelatorioPiaRespostaOpcao {
  opcao: string;
  id_relatorio_pia_resposta: bigint;
}
