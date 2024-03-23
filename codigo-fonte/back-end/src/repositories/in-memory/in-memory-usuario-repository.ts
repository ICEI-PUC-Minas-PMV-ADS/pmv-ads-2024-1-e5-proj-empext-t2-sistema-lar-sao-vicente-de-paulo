import { Prisma, Usuario } from '@prisma/client';
import { usuarioRepository } from '../usuario-repository';
import { UpdateUsuarioDto } from '@/app/modules/usuario/dtos/update-usuario.dto';
import { AppError } from '@utils/app-error';
import { randomUUID } from 'node:crypto';

export class InMemoryUsuarioRepository implements usuarioRepository {
	public items: Usuario[] = [];

	async findByEmail(email: string) {
		return this.items.find((usuario) => usuario.email === email) || null;
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
			id_cargo: null,
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
	async update(uid: string, data: UpdateUsuarioDto) {
		const usuarioIndex = this.items.findIndex(
			(usuario) => usuario.uid === uid,
		);
		if (usuarioIndex === -1) {
			throw new AppError('Nenhum usuário encontrado');
		}
		const usuario = this.items[usuarioIndex];
		this.items[usuarioIndex] = {
			...usuario,
			...data,
			atualizado_em: new Date(),
		};
		return this.items[usuarioIndex];
	}
	async save(data: Usuario) {
		const usuarioIndex = this.items.findIndex(
			(usuario) => usuario.uid === data.uid,
		);
		if (usuarioIndex === -1) {
			throw new AppError('Nenhum usuário encontrado');
		}
		const usuario = this.items[usuarioIndex];
		this.items[usuarioIndex] = {
			...usuario,
			atualizado_em: new Date(),
		};
		return this.items[usuarioIndex];
	}

	async findById(id: bigint) {
		return this.items.find((usuario) => usuario.id === id) || null;
	}
	async alreadyExists(email: string, cpf_cnh: string) {
		return (
			(this.items.find((usuario) => usuario.email === email) &&
				this.items.find((usuario) => usuario.cpf_cnh === cpf_cnh)) ||
			null
		);
	}
}
