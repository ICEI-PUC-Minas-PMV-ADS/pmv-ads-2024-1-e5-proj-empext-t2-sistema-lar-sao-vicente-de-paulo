import { Prisma, Usuario } from '@prisma/client';
import { usuarioRepository } from '../usuario-repository';
import { UpdateUsuarioDto } from '@/app/modules/usuario/dtos/update-usuario.dto';
import { prisma } from '@/core/providers/database/prisma.service';
export class PrismaUsuarioRepository implements usuarioRepository {
	async findById(id: bigint) {
		const usuario = prisma.usuario.findFirst({
			where: {
				id,
			},
		});

		return usuario;
	}

	async alreadyExistsUserEmail(email: string) {
		const usuario = await prisma.usuario.findFirst({
			where: {
				email,
			},
		});
		return usuario;
	}

	async alreadyExistsUserCPF(cpf_cnh: string) {
		const usuario = await prisma.usuario.findFirst({
			where: {
				cpf_cnh,
			},
		});
		return usuario;
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
			include: { cargo: { select: { nome: true } } },
		});

		return usuario;
	}

	async update(uid: string, data: UpdateUsuarioDto) {
		const usuario = await prisma.usuario.update({
			where: {
				uid,
			},
			data,
		});

		return usuario;
	}

	async delete(uid: string) {
		const usuario = await prisma.usuario.delete({
			where: {
				uid: uid,
			},
		});

		return usuario;
	}
}
