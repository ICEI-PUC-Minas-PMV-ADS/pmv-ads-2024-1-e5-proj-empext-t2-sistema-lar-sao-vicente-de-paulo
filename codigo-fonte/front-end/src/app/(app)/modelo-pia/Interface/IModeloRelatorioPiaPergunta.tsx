import { IModeloRelatorioPiaResposta } from "./IModeloRelatorioPiaResposta";

export interface IModeloRelatorioPiaPergunta {
  id: bigint;
  uid: string;
  pergunta: string;
  criado_em: Date;
  atualizado_em: Date;
  id_modelo_relatorio_pia: bigint;
  modelo_relatorio_pia_resposta?: IModeloRelatorioPiaResposta[];
}

export interface IOperationModeloRelatorioPiaPergunta {
  pergunta: string;
  id_modelo_relatorio_pia: bigint;
}
