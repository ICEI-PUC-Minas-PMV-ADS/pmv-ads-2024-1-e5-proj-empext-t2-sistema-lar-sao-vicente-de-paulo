import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';

@Injectable()
export class FindAllModeloRelatorioPiaOpcaoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.ModeloRelatorioPiaRespostaOpcaoFindManyArgs,
	): Promise<{
		count: number;
		modelosRelatoriosPiasOpcaos: ModeloRelatorioPiaRespostaOpcao[];
	}> {
		query = {
			...query,
		};

		const [modelosRelatoriosPiasOpcaos, count] =
			await this.prisma.$transaction([
				this.prisma.modeloRelatorioPiaRespostaOpcao.findMany(query),
				this.prisma.modeloRelatorioPiaRespostaOpcao.count({
					where: query.where,
				}),
			]);

		return {
			count,
			modelosRelatoriosPiasOpcaos,
		};
	}
}
