import { IOperationCargoPermissao } from "./ICargoPermissao";

export interface ICargo {
  id: bigint;
  uid: string;
  nome: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IOperationCargo {
  nome: string;
  permissoes: IOperationCargoPermissao[];
}
