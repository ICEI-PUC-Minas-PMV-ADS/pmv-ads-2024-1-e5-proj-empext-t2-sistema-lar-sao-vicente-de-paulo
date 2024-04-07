export interface ICargoPermissao {
  id: number;
  uid: string;
  ativo: boolean;
  id_cargo: number;
  id_permissao: number;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IOperationCargoPermissao {
  uid?: string;
  id_permissao: number;
  ativo: boolean;
}
