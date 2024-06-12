import { IRelatorioPiaRespostaOpcao } from "./IRelatorioPiaRespostaOpcao";

export interface IRelatorioPiaResposta {
  id?: bigint;
  uid?: string;
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  criado_em?: Date;
  atualizado_em?: Date;
  id_relatorio_pia_pergunta?: bigint;
  relatorio_pia_resposta_opcao?: IRelatorioPiaRespostaOpcao[];
}

export interface IOperationRelatorioPiaResposta {
  titulo: string;
  tipo: "TEXT" | "RADIO" | "CHECKBOX";
  id_relatorio_pia_pergunta: bigint;
}
