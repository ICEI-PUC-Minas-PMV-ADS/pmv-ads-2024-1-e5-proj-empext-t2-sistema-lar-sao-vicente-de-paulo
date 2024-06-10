import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository';
import { UpdateModeloRelatorioPiaRespostaDto } from '../dtos/update-modelo-relatorio-pia-resposta.dto';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';

@Injectable()
export class UpdateModeloRelatorioPiaRespostaService {
	constructor(
		private modeloRelatorioPiaRespostaRepository: PrismaModeloRelatorioPiaRespostaRepository,
	) {}
	async execute(
		uid: string,
		data: UpdateModeloRelatorioPiaRespostaDto,
	): Promise<ModeloRelatorioPiaResposta | null> {
		const alreadyExists =
			await this.modeloRelatorioPiaRespostaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Modelo de relatório PIA não encontrado');
		}

		const modeloRelatoriaPiaPergunta =
			await this.modeloRelatorioPiaRespostaRepository.update(
				data,
				alreadyExists,
			);

		return modeloRelatoriaPiaPergunta;
	}
}
