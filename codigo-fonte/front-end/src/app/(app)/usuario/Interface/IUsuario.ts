export interface IUsuario {
  id: bigint;
  uid: string;
  foto: Buffer;
  id_cargo: bigint;
  nome: string;
  cpf_cnh: string;
  email: string;
  senha: string;
  situacao: "ATIVO" | "INATIVO";
  criado_em: Date;
  atualizado_em: Date;
  cargo?: {
    nome: string;
  };
}

export interface IOperationUsuario {
  foto: Buffer;
  id_cargo: bigint;
  nome: string;
  cpf_cnh: string;
  email: string;
  senha: string;
  situacao: "ATIVO" | "INATIVO";
}
