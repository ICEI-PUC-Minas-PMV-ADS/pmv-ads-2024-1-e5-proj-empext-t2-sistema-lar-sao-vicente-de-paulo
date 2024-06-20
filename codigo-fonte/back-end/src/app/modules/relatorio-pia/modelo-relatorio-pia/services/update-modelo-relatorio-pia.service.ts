import { Injectable } from '@nestjs/common';
import { PrismaModeloRelatorioPiaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { AppError } from '@utils/app-error';
import { UpdateModeloRelatorioPiaDto } from '../dtos/update-modelo-relatorio-pia.dto';
import { ModeloRelatorioPia } from '../entities/modelo-relatorio-pia.entity';

@Injectable()
export class UpdateModeloRelatorioPiaService {
	constructor(
		private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
	) {}
	async execute(
		uid: string,
		data: UpdateModeloRelatorioPiaDto,
	): Promise<ModeloRelatorioPia> {
		const AlreadyExists =
			await this.modeloRelatorioPiaRepository.findByUid(uid);

		if (!AlreadyExists) {
			throw new AppError('Modelo de relatório PIA não encontrado');
		}

		const modeloRelatorioPia =
			await this.modeloRelatorioPiaRepository.versioningUpdate(uid);

		const update = await this.modeloRelatorioPiaRepository.update(
			data,
			modeloRelatorioPia,
		);

		return update;
	}
}
