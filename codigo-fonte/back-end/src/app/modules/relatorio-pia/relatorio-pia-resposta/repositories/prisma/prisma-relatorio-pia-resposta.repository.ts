import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaRespostaDto } from '../../dtos/create-relatorio-pia-resposta.dto';
import { UpdateRelatorioPiaRespostaDto } from '../../dtos/update-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../../entities/relatorio-pia-resposta.entity';
import { relatorioPiaRespostaRepository } from '../relatorio-pia-resposta.repository';
import { $Enums } from '@prisma/client';

export class PrismaRelatorioPiaRespostaRepository
	implements relatorioPiaRespostaRepository
{
	async create(
		data: CreateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta = await prisma.relatorioPiaResposta.create({
			data,
		});

		return relatorioPiaResposta;
	}

	async findByUid(uid: string): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await prisma.relatorioPiaResposta.findUnique({
				where: {
					uid,
				},
				include: {
					relatorio_pia_pergunta: true,
					relatorio_pia_resposta_opcao: true,
				},
			});

		return relatorioPiaResposta;
	}
	async findById(id: bigint): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await prisma.relatorioPiaResposta.findUnique({
				where: {
					id,
				},
			});

		return relatorioPiaResposta;
	}
	async findByTitulo(titulo: string): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await prisma.relatorioPiaResposta.findFirst({
				where: {
					titulo,
				},
			});

		return relatorioPiaResposta;
	}
	async findByTipo(tipo: $Enums.tiposReposta): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await prisma.relatorioPiaResposta.findFirst({
				where: {
					tipo,
				},
			});

		return relatorioPiaResposta;
	}
	async update(
		data: UpdateRelatorioPiaRespostaDto,
		from: RelatorioPiaResposta,
	): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta = await prisma.relatorioPiaResposta.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return relatorioPiaResposta;
	}
	async delete(uid: string): Promise<void> {
		await prisma.relatorioPiaResposta.delete({
			where: {
				uid,
			},
		});
	}
}
