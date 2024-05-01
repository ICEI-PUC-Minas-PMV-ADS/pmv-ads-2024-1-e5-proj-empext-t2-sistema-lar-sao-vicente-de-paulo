import { IOperationCargoPermissao } from "./ICargoPermissao";

export interface ICargo {
  id: bigint;
  uid: string;
  nome: string;
  criado_em: Date;
  situacao?: "ATIVO" | "INATIVO";
  atualizado_em: Date;
  cargo_permissao?: IOperationCargoPermissao[];
  _count?: { usuario: number };
}

export interface IOperationCargo {
  uid?: string;
  nome: string;
  permissoes: IOperationCargoPermissao[];
  situacao?: "ATIVO" | "INATIVO";
}
