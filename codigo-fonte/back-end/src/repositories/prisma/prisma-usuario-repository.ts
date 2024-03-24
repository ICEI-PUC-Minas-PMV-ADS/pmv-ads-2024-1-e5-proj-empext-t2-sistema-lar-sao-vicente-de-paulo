import { Prisma, Usuario } from '@prisma/client';
import { usuarioRepository } from '../usuario-repository';
import { UpdateUsuarioDto } from '@/app/modules/usuario/dtos/update-usuario.dto';
import { PrismaService } from '@/core/providers/database/prisma.service';

export class PrismaUsuarioRepository implements usuarioRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: bigint) {
		const usuario = this.prisma.usuario.findFirst({
			where: {
				id,
			},
		});

		return usuario;
	}

	async alreadyExists(email: string, cpf_cnh: string) {
		const usuario = await this.prisma.usuario.findFirst({
			where: {
				OR: [{ email }, { cpf_cnh }],
			},
		});
		return usuario;
	}

	async findByCpf(cpf_cnh: string) {
		const usuario = await this.prisma.usuario.findUnique({
			where: {
				cpf_cnh,
			},
		});
		return usuario;
	}

	async create(data: Prisma.UsuarioCreateInput) {
		const usuario = await this.prisma.usuario.create({
			data,
		});

		return usuario;
	}

	async findByUid(uid: string) {
		const usuario = await this.prisma.usuario.findUnique({
			where: {
				uid,
			},
		});

		return usuario;
	}

	async update(uid: string, data: UpdateUsuarioDto) {
		const usuario = await this.prisma.usuario.update({
			where: {
				uid,
			},
			data,
		});

		return usuario;
	}

	async save(data: Usuario) {
		const usuario = await this.prisma.usuario.update({
			where: {
				uid: data.uid,
			},
			data,
		});

		return usuario;
	}
}
