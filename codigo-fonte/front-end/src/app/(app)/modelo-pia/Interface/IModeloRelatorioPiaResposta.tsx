import { IModeloRelatorioPiaRespostaOpcao } from "./IModeloRelatorioPiaRespostaOpcao";

export interface IModeloRelatorioPiaResposta {
  id: bigint;
  uid: string;
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  criado_em: Date;
  atualizado_em: Date;
  id_modelo_relatorio_pia_pergunta: bigint;
  modelo_relatorio_pia_resposta_opcao?: IModeloRelatorioPiaRespostaOpcao[];
}

export interface IOperationModeloRelatorioPiaResposta {
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  id_modelo_relatorio_pia_pergunta: bigint;
}
