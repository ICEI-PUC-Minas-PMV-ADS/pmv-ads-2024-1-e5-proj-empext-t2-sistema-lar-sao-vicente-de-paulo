import { Prisma, Usuario } from "@prisma/client";
import { usuarioRepository } from "../usuario-repository";
import { prisma } from "@/database/prisma.service";

export class PrismaUsuarioRepository implements usuarioRepository {

  async alreadyExists(email: string, cpf_cnh: string) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email },
          { cpf_cnh },
        ]
      }
    })
    return usuario
  }

  async findByCpf(cpf_cnh: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        cpf_cnh,
      },
    });
    return usuario;
  }
  async create(data: Prisma.UsuarioCreateInput) {
    const usuario = await prisma.usuario.create({
      data,
    });

    return usuario;
  }

  async findByUid(uid: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        uid,
      },
    });

    return usuario;
  }

  async update(data: Usuario) {
    const usuario = await prisma.usuario.update({
      where: {
        uid: data.uid,
      },
      data,
    });

    return usuario;
  }
  async delete(uid: string) {
    try {
      await prisma.usuario.delete({
        where: {
          uid: uid,
        },
      });
    } catch (error) {
      throw new Error("Erro ao excluir o usuário.");
    }
  }
}
