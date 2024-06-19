import { IRelatorioPiaResposta } from "./IRelatorioPiaResposta";

export interface IRelatorioPiaPergunta {
  id?: bigint;
  uid?: string;
  pergunta: string;
  criado_em?: Date;
  atualizado_em?: Date;
  id_relatorio_pia?: bigint;
  relatorio_pia_resposta?: IRelatorioPiaResposta[];
}

export interface IOperationRelatorioPiaPergunta {
  pergunta: string;
  id_relatorio_pia: bigint;
}
