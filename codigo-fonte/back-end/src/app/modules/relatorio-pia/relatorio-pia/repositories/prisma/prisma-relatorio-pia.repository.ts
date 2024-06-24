import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaDto } from '../../dtos/create-relatorio-pia.dto';
import { UpdateRelatorioPiaDto } from '../../dtos/update-relatorio-pia.dto';
import { RelatorioPia } from '../../entities/relatorio-pia.entity';
import { relatorioPiaRepository } from '../relatorio-pia.repository';

export class PrismaRelatorioPiaRepository implements relatorioPiaRepository {
	async create(data: CreateRelatorioPiaDto): Promise<RelatorioPia> {
		const relatorioPia = await prisma.relatorioPia.create({
			data,
		});

		return relatorioPia;
	}
	async findByUid(uid: string): Promise<RelatorioPia> {
		const relatorioPia = await prisma.relatorioPia.findUnique({
			where: {
				uid,
			},
			include: {
				relatorio_pia_pergunta: {
					include: {
						relatorio_pia_resposta: {
							include: {
								relatorio_pia_resposta_opcao: true,
								relatorio_pia_resposta_definida: true,
							},
						},
					},
				},
			},
		});

		return relatorioPia;
	}
	async findById(id: bigint): Promise<RelatorioPia> {
		const relatorioPia = await prisma.relatorioPia.findUnique({
			where: {
				id,
			},
		});

		return relatorioPia;
	}
	async findByName(nome: string): Promise<RelatorioPia> {
		const relatorioPia = await prisma.relatorioPia.findFirst({
			where: {
				nome,
			},
		});

		return relatorioPia;
	}
	async update(
		data: UpdateRelatorioPiaDto,
		from: RelatorioPia,
	): Promise<RelatorioPia> {
		const relatorioPia = await prisma.relatorioPia.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return relatorioPia;
	}
	async delete(uid: string): Promise<void> {
		const relatorioPia = await prisma.relatorioPia.findUnique({
			where: {
				uid,
			},
		});

		await prisma.relatorioPiaRespostaDefinida.deleteMany({
			where: {
				relatorio_pia_resposta: {
					relatorio_pia_pergunta: {
						id_relatorio_pia: relatorioPia.id,
					},
				},
			},
		});

		await prisma.relatorioPiaRespostaOpcao.deleteMany({
			where: {
				relatorio_pia_resposta: {
					relatorio_pia_pergunta: {
						id_relatorio_pia: relatorioPia.id,
					},
				},
			},
		});

		await prisma.relatorioPiaResposta.deleteMany({
			where: {
				relatorio_pia_pergunta: {
					id_relatorio_pia: relatorioPia.id,
				},
			},
		});

		await prisma.relatorioPiaPergunta.deleteMany({
			where: {
				id_relatorio_pia: relatorioPia.id,
			},
		});

		await prisma.relatorioPia.delete({
			where: {
				uid,
			},
		});
	}
}
