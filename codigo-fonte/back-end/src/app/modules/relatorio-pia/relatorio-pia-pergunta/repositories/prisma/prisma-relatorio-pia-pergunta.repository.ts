import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaPerguntaDto } from '../../dtos/create-relatorio-pia-pergunta.dto';
import { UpdateRelatorioPiaPerguntaDto } from '../../dtos/update-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../../entities/relatorio-pia-pergunta.entity';
import { relatorioPiaPerguntaRepository } from '../relatorio-pia-pergunta.repository';

export class PrismaRelatorioPiaPerguntaRepository
	implements relatorioPiaPerguntaRepository
{
	async create(
		data: CreateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const relatorioPiaPergunta = await prisma.relatorioPiaPergunta.create({
			data,
		});

		return relatorioPiaPergunta;
	}
	async findByUid(uid: string): Promise<RelatorioPiaPergunta> {
		const relatorioPiaPergunta =
			await prisma.relatorioPiaPergunta.findUnique({
				where: {
					uid,
				},
				include: {
					relatorio_pia: true,
					relatorio_pia_resposta: true,
				},
			});

		return relatorioPiaPergunta;
	}
	async update(
		data: UpdateRelatorioPiaPerguntaDto,
		from: RelatorioPiaPergunta,
	): Promise<RelatorioPiaPergunta> {
		const relatorioPiaPergunta = await prisma.relatorioPiaPergunta.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return relatorioPiaPergunta;
	}
	async delete(uid: string): Promise<void> {
		await prisma.relatorioPiaPergunta.delete({
			where: {
				uid,
			},
		});
	}
}
