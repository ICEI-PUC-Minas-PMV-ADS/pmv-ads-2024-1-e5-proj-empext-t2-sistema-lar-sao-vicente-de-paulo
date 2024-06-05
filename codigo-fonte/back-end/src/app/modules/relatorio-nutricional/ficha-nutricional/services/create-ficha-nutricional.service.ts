import { Injectable } from '@nestjs/common';
import { PrismaFichaNutricionalRepository } from '../repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaIdosoRepository } from '@/app/modules/idoso/repositories/prisma/prisma-idoso-repository';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { CreateFichaNutricionalDto } from '../dtos/create-ficha-nutricional';
import { AppError } from '@utils/app-error';

@Injectable()
export class CreateFichaNutricionalService {
	constructor(
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
		private idosoRepository: PrismaIdosoRepository,
		private usuarioRepository: PrismaUsuarioRepository,
	) {}

	async execute(data: CreateFichaNutricionalDto) {
		const idoso = await this.idosoRepository.findById(data.id_idoso);

		if (!idoso) {
			throw new AppError('Idoso não encontrado');
		}

		const usuario = await this.usuarioRepository.findById(data.id_usuario);

		if (!usuario) {
			throw new AppError('Usuário não encontrado');
		}

		const fichaNutricional = await this.fichaNutricionalRepository.create({
			...data,
		});

		return fichaNutricional;
	}
}
