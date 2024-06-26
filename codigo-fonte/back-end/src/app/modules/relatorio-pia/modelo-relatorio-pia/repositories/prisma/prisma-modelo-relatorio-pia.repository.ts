import { prisma } from '@/core/providers/database/prisma.service';
import { modeloRelatorioPiaRepository } from '../modelo-relatorio-pia.repository';
import { ModeloRelatorioPia } from '@prisma/client';
import { UpdateModeloRelatorioPiaDto } from '../../dtos/update-modelo-relatorio-pia.dto';
import { CreateModeloRelatorioPiaDto } from '../../dtos/create-modelo-relatorio-pia.dto';

export class PrismaModeloRelatorioPiaRepository
	implements modeloRelatorioPiaRepository
{
	async findByNome(nome: string) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.findFirst({
			where: {
				nome,
			},
		});
		return modeloRelatorioPia;
	}

	async versioningUpdate(uid: string) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
			where: { uid },
		});

		if (!modeloRelatorioPia) {
			throw new Error('Modelo de relatório PIA não encontrado.');
		}

		return await prisma.modeloRelatorioPia.update({
			where: { uid },
			data: {
				versao: { increment: 1 },
			},
		});
	}

	async create(data: CreateModeloRelatorioPiaDto) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.create({
			data,
		});

		return modeloRelatorioPia;
	}
	async findByUid(uid: string) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
			where: {
				uid,
			},
			include: {
				modelo_relatorio_pia_pergunta: {
					include: {
						modelo_relatorio_pia_resposta: {
							include: {
								modelo_relatorio_pia_resposta_opcao: {
									orderBy: { criado_em: 'asc' },
								},
							},
							orderBy: { criado_em: 'asc' },
						},
					},
					orderBy: { criado_em: 'asc' },
				},
			},
		});
		return modeloRelatorioPia;
	}
	async findById(id: bigint) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
			where: {
				id,
			},
		});
		return modeloRelatorioPia;
	}
	async update(data: UpdateModeloRelatorioPiaDto, from: ModeloRelatorioPia) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.update({
			where: {
				uid: from.uid,
			},
			data,
		});
		return modeloRelatorioPia;
	}

	async delete(uid: string) {
		const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
			where: {
				uid,
			},
		});

		await prisma.modeloRelatorioPiaRespostaOpcao.deleteMany({
			where: {
				modelo_relatorio_pia_resposta: {
					modelo_relatorio_pia_pergunta: {
						id_modelo_relatorio_pia: modeloRelatorioPia.id,
					},
				},
			},
		});

		await prisma.modeloRelatorioPiaResposta.deleteMany({
			where: {
				modelo_relatorio_pia_pergunta: {
					id_modelo_relatorio_pia: modeloRelatorioPia.id,
				},
			},
		});

		await prisma.modeloRelatorioPiaPergunta.deleteMany({
			where: {
				id_modelo_relatorio_pia: modeloRelatorioPia.id,
			},
		});

		await prisma.modeloRelatorioPia.delete({
			where: {
				uid,
			},
		});
	}
}
