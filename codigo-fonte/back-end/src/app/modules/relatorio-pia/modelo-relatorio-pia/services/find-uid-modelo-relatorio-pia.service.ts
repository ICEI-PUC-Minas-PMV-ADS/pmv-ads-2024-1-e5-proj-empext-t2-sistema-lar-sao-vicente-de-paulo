import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { ModeloRelatorioPia } from '../entities/modelo-relatorio-pia.entity';

@Injectable()
export class FindUidModeloRelatorioPiaService {
	constructor(private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,) {}

	async execute(uid: string): Promise<ModeloRelatorioPia | null> {
		const modeloRelatorioPia = await this.modeloRelatorioPiaRepository.findByUid(uid);

		if (!modeloRelatorioPia) {
			throw new AppError("Modelo de Relatório PIA não encontrado");
		}

		return modeloRelatorioPia;
	}
}
