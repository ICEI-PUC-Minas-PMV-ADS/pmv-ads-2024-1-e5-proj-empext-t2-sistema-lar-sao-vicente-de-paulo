export interface IResponsavelIdoso {
  id: bigint;
  uid: string;
  parentesco: string;
  nome_completo: string;
  logradouro: string;
  endereco_numero: string;
  bairro: string;
  cep: string;
  estado: string;
  cidade: string;
  telefone_1: string;
  telefone_2?: string;
  criado_em: Date;
  atualizado_em: Date;
  id_idoso: bigint;
}

export interface IOperationResponsavelIdoso {
  parentesco: string;
  nome_completo: string;
  logradouro: string;
  endereco_numero: string;
  bairro: string;
  cep: string;
  estado: string;
  cidade: string;
  telefone_1: string;
  telefone_2?: string;
  id_idoso: bigint;
}
