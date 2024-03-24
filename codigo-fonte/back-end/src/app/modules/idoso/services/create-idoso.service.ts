import { Injectable } from '@nestjs/common';
import { CreateIdosoDto } from '../dtos/create-idoso.dto';
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { AppError } from '@utils/app-error';
import { PrismaIdosoRepository } from '@/repositories/prisma/prisma-idoso-repository';
import { Idoso } from '../entities/idoso.entity';

@Injectable()
export class CreateIdosoService {
	constructor(
		private idosoRepository: PrismaIdosoRepository,
		private usuarioRepository: PrismaUsuarioRepository,
	) {}

	async execute(data: CreateIdosoDto): Promise<Idoso> {
		const usuario = await this.usuarioRepository.findById(data.id_usuario);

		if (!usuario) {
			throw new AppError('Usuário não encontrado');
		}

		const idosoWithSameCpf = await this.idosoRepository.findByCpf(data.cpf);

		if (idosoWithSameCpf) {
			throw new AppError('Idoso já cadastrado');
		}

		const idoso = await this.idosoRepository.create({
			...data,
			id_usuario: data.id_usuario,
		});

		return idoso;
	}
}
