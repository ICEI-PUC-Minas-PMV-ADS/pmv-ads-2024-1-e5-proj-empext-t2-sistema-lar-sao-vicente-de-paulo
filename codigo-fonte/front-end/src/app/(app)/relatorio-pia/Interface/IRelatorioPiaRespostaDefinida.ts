export interface IRelatorioPiaRespostaDefinida {
  id?: bigint;
  uid?: string;
  valor: string;
  criado_em?: Date;
  atualizado_em?: Date;
  uid_relatorio_pia_resposta_opcao?: bigint;
  id_relatorio_pia_resposta?: bigint;
}

export interface IOperationRelatorioPiaRespostaDefinida {
  valor: string;
  uid_relatorio_pia_resposta_opcao?: bigint;
  id_relatorio_pia_resposta: bigint;
}
