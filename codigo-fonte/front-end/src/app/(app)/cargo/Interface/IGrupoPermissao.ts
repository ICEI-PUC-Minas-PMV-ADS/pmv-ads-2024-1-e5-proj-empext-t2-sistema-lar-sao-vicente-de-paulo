import { IPermissao } from "./IPermissao";

export interface IGrupoPermissao {
  id: number;
  uid: string;
  nome: string;
  codigo: number;
  criado_em: Date;
  atualizado_em: Date;
  permissao?: IPermissao[];
}
