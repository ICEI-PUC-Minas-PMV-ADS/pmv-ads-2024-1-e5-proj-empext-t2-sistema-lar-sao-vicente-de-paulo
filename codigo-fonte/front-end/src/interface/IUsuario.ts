export interface IUsuario {
  id: bigint;
  uid: string;
  foto: string;
  nome: string;
  cpf_cnh: string;
  email: string;
  senha: string;
  situacao: string;
  criado_em: Date | string;
  atualizado_em: Date | string;
  id_cargo: bigint;
  cargo: {
    id: bigint;
    uid: string;
    nome: string;
    criado_em: Date | string;
    atualizado_em: Date | string;
    cargo_permissao: {
      id: bigint;
      uid: string;
      ativo: boolean;
      criado_em: Date | string;
      atualizado_em: Date | string;
      id_permissao: number;
      permissao: {
        id: bigint;
        uid: string;
        nome: number;
        codigo: number;
        criado_em: Date | string;
        atualizado_em: Date | string;
        id_grupo_permissao: number;
        grupo_permissao: {
          id: bigint;
          uid: string;
          nome: string;
          codigo: number;
          criado_em: Date | string;
          atualizado_em: Date | string;
        };
      };
    }[];
  };
}
