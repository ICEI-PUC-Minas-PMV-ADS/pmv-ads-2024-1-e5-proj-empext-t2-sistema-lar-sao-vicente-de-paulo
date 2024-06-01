export interface IModeloRelatorioPia {
  id: bigint;
  uid: string;
  nome: string;
  versao: number;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IOperationModeloRelatorioPia {
  nome: string;
}
