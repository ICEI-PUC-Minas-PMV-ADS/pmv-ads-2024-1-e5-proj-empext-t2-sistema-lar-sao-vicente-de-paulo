import { Situacao } from "@/interface/ISituacao";

export interface IIdoso {
  id: bigint;
  uid: string;
  id_usuario: bigint;
  foto?: string;
  nome_completo: string;
  apelido?: string;
  genero: string;
  cidade: string;
  data_nascimento: Date;
  naturalidade: string;
  estado: string;
  estado_civil: string;
  religiao: string;
  escolaridade: string;
  nome_pai: string;
  nome_mae: string;
  data_ingresso: Date;
  cpf?: string;
  cnh?: string;
  rg?: string;
  cartao_sus?: string;
  rg_orgao_expedidor?: string;
  titulo_eleitor?: string;
  titulo_eleitor_secao?: string;
  titulo_eleitor_zona?: string;
  certidao_nascimento_folha?: string;
  certidao_nascimento_livro?: string;
  certidao_casamento_folha?: string;
  certidao_casamento_livro?: string;
  situacao: Situacao;
  motivo_inativacao?: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IOperationIdoso {
  foto?: string;
  nome_completo: string;
  apelido?: string;
  genero: string;
  cidade: string;
  data_nascimento: Date;
  naturalidade: string;
  estado: string;
  estado_civil: string;
  religiao: string;
  escolaridade: string;
  nome_pai: string;
  nome_mae: string;
  data_ingresso: Date;
  cpf?: string;
  cnh?: string;
  rg?: string;
  cartao_sus?: string;
  rg_orgao_expedidor?: string;
  titulo_eleitor?: string;
  titulo_eleitor_secao?: string;
  titulo_eleitor_zona?: string;
  certidao_nascimento_folha?: string;
  certidao_nascimento_livro?: string;
  certidao_casamento_folha?: string;
  certidao_casamento_livro?: string;
  situacao: Situacao;
}
