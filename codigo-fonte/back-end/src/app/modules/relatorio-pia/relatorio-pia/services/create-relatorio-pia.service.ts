import { Injectable } from '@nestjs/common';
import { CreateRelatorioPiaDto } from '../dtos/create-relatorio-pia.dto';
import { PrismaRelatorioPiaRepository } from '../repositories/prisma/prisma-relatorio-pia.repository';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';

@Injectable()
export class CreateRelatorioPiaService {
	constructor(private relatorioPiaRepository: PrismaRelatorioPiaRepository) {}

	async execute(data: CreateRelatorioPiaDto): Promise<RelatorioPia> {
		const modeloRelatorioPiaExists =
			await prisma.modeloRelatorioPia.findUnique({
				where: { id: data.id_modelo_relatorio_pia },
			});

		if (!modeloRelatorioPiaExists) {
			throw new AppError('id_modelo_relatorio_pia não existe');
		}

		const alreadyExists = await prisma.relatorioPia.findFirst({
			where: {
				nome: data.nome,
			},
		});

		if (alreadyExists) {
			throw new AppError('Relatório PIA já existente');
		}

		const RelatorioPia = await this.relatorioPiaRepository.create(data);

		return RelatorioPia;
	}
}
