export interface IPermissao {
  id: number;
  uid: string;
  nome: string;
  codigo: number;
  criado_em: Date;
  atualizado_em: Date;
  id_grupo_permissao: number;
}
