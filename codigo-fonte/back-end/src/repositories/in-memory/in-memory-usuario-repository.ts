import { Prisma, Usuario } from "@prisma/client";
import { usuarioRepository } from "../usuario-repository";
import { randomUUID } from "crypto";

export class InMemoryUsuarioRepository implements usuarioRepository {
  async alreadyExists(email: string, cpf_cnh: string) {
    return (
      this.items.find((usuario) => usuario.email === email) && this.items.find((usuario) => usuario.cpf_cnh === cpf_cnh) || null
    )
  }
  public items: Usuario[] = [];

  async findByEmail(email: string) {
    return (
      this.items.find((usuario) => usuario.email === email) || null
    )
  }

  async findByCpf(cpf_cnh: string) {
    return (
      this.items.find((usuario) => usuario.cpf_cnh === cpf_cnh) || null
    );
  }

  async create(data: Prisma.UsuarioCreateInput) {
    const usuario = {
      id: data.id ? BigInt(data.id) : undefined,
      uid: randomUUID(),
      foto: data.foto ?? null,
      nome: data.nome,
      cargo_id: null,
      cpf_cnh: data.cpf_cnh,
      email: data.email,
      senha: data.senha,
      situacao: data.situacao,
      criado_em: new Date(),
      atualizado_em: new Date(),
    };

    this.items.push(usuario);

    return usuario;
  }

  async findByUid(uid: string) {
    return this.items.find((usuario) => usuario.uid === uid) || null;
  }
  async update(data: Usuario) {
    const usuarioIndex = this.items.findIndex(
      (usuario) => usuario.uid === data.uid,
    );
    if (usuarioIndex === -1) {
      throw new Error("Usuário não encontrado.");
    }
    const usuario = this.items[usuarioIndex];
    this.items[usuarioIndex] = {
      ...usuario,
      ...data,
      atualizado_em: new Date(),
    };
    return this.items[usuarioIndex];
  }
  async delete(uid: string) {
    const usuarioIndex = this.items.findIndex(
      (usuario) => usuario.uid === uid,
    );
    if (usuarioIndex === -1) {
      throw new Error("Usuário não encontrado.");
    }
    this.items.splice(usuarioIndex, 1);
  }
}
