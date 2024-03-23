import { $Enums, Prisma, Usuario } from '@prisma/client';
import { usuarioRepository } from '../usuario-repository';
import { prisma } from '@/database/prisma.service';
import { UpdateUsuarioDto } from '@/app/modules/usuario/dtos/update-usuario.dto';

export class PrismaUsuarioRepository implements usuarioRepository {
	async findById(id: bigint) {
		const usuario = prisma.usuario.findFirst({
			where: {
				id,
			},
		});

		return usuario;
	}

	async alreadyExists(email: string, cpf_cnh: string) {
		const usuario = await prisma.usuario.findFirst({
			where: {
				OR: [{ email }, { cpf_cnh }],
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

	async save(data: Usuario) {
		const usuario = await prisma.usuario.update({
			where: {
				uid: data.uid,
			},
			data,
		});

		return usuario;
	}
}
