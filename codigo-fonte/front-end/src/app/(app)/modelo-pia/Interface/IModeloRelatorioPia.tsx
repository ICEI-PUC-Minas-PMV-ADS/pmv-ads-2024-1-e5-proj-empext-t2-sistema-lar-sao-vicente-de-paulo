import { IModeloRelatorioPiaPergunta } from "./IModeloRelatorioPiaPergunta";

export interface IModeloRelatorioPia {
  id: bigint;
  uid: string;
  nome: string;
  versao: number;
  criado_em: Date;
  atualizado_em: Date;
  modelo_relatorio_pia_pergunta?: IModeloRelatorioPiaPergunta[];
}

export interface IOperationModeloRelatorioPia {
  nome: string;
}
