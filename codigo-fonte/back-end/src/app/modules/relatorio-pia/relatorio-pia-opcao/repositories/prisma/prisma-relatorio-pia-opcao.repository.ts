import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaOpcaoDto } from '../../dtos/create-relatorio-pia-opcao.dto';
import { UpdateRelatorioPiaOpcaoDto } from '../../dtos/update-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../../entities/relatorio-pia-opcao.entity';
import { relatorioPiaOpcaoRepository } from '../relatorio-pia-opcao.repository';

export class PrismaRelatorioPiaOpcaoRepository
	implements relatorioPiaOpcaoRepository
{
	async create(
		data: CreateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao = await prisma.relatorioPiaRespostaOpcao.create(
			{
				data,
			},
		);

		return relatorioPiaOpcao;
	}
	async findByUid(uid: string): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao =
			await prisma.relatorioPiaRespostaOpcao.findUnique({
				where: {
					uid,
				},
				include: {
					relatorio_pia_resposta: true,
					relatorio_pia_resposta_definida: true,
				},
			});

		return relatorioPiaOpcao;
	}
	async findByOption(opcao: string): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao =
			await prisma.relatorioPiaRespostaOpcao.findFirst({
				where: {
					opcao,
				},
			});

		return relatorioPiaOpcao;
	}
	async update(
		data: UpdateRelatorioPiaOpcaoDto,
		from: RelatorioPiaRespostaOpcao,
	): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao = await prisma.relatorioPiaRespostaOpcao.update(
			{
				where: {
					uid: from.uid,
				},
				data,
			},
		);

		return relatorioPiaOpcao;
	}
	async delete(uid: string): Promise<void> {
		await prisma.relatorioPiaRespostaOpcao.delete({
			where: {
				uid,
			},
		});
	}
}
