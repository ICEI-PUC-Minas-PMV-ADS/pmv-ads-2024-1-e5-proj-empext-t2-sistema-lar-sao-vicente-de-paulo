import { IIdoso } from "../../idoso/Interface/IIdoso";
import { IUsuario } from "../../usuario/Interface/IUsuario";
import { IRelatorioPiaPergunta } from "./IRelatorioPiaPergunta";

export interface IRelatorioPia {
  id?: bigint;
  uid?: string;
  nome: string;
  criado_em?: Date;
  atualizado_em?: Date;
  data_vencimento?: Date;
  id_modelo_relatorio_pia?: bigint;
  id_usuario?: bigint;
  id_idoso?: bigint;
  idoso?: IIdoso;
  usuario?: IUsuario;
  relatorio_pia_pergunta?: IRelatorioPiaPergunta[];
}

export interface IOperationRelatorioPia {
  nome: string;
  id_modelo_relatorio_pia?: bigint;
  id_usuario: bigint;
  id_idoso: bigint;
  data_vencimento?: Date;
}
