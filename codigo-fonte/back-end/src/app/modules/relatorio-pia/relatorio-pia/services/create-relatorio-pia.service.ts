import { Injectable } from '@nestjs/common';
import { CreateRelatorioPiaDto } from '../dtos/create-relatorio-pia.dto';
import { PrismaRelatorioPiaRepository } from '../repositories/prisma/prisma-relatorio-pia.repository';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaRepository } from '../../modelo-relatorio-pia/repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { PrismaIdosoRepository } from '@/app/modules/idoso/repositories/prisma/prisma-idoso-repository';

@Injectable()
export class CreateRelatorioPiaService {
	constructor(
		private relatorioPiaRepository: PrismaRelatorioPiaRepository,
		private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
		private usuarioRepository: PrismaUsuarioRepository,
		private idosoRepository: PrismaIdosoRepository,
	) {}

	async execute(data: CreateRelatorioPiaDto): Promise<RelatorioPia> {
		const modeloRelatorioPiaExists =
			await this.modeloRelatorioPiaRepository.findById(
				data.id_modelo_relatorio_pia,
			);

		if (!modeloRelatorioPiaExists) {
			throw new AppError(
				'Modelo de Relatório PIA com o ID fornecido não existe',
			);
		}

		const usuarioExists = await this.usuarioRepository.findById(
			data.id_usuario,
		);

		if (!usuarioExists) {
			throw new AppError('Usuário com o ID fornecido não existe');
		}

		const idosoExists = await this.idosoRepository.findById(data.id_idoso);

		if (!idosoExists) {
			throw new AppError('Idoso com o ID fornecido não existe');
		}

		const relatorioPia = await this.relatorioPiaRepository.create(data);

		return relatorioPia;
	}
}
