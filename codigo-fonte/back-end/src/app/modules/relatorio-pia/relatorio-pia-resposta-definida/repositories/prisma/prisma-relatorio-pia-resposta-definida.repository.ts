import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaRespostaDefinidaDto } from '../../dtos/create-relatorio-pia-resposta-definida.dto';
import { UpdateRelatorioPiaRespostaDefinidaDto } from '../../dtos/update-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../../entities/relatorio-pia-resposta-definida.entity';
import { relatorioPiaRespostaDefinidaRepository } from '../relatorio-pia-resposta-definida.repository';

export class PrismaRelatorioPiaRespostaDefinidaRepository
	implements relatorioPiaRespostaDefinidaRepository
{
	async create(
		data: CreateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaDefinida =
			await prisma.relatorioPiaRespostaDefinida.create({
				data,
			});

		return relatorioPiaRespostaDefinida;
	}

	async findByUid(uid: string): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaDefinida =
			await prisma.relatorioPiaRespostaDefinida.findUnique({
				where: {
					uid,
				},
				include: {
					relatorio_pia_resposta_opcao: true,
				},
			});

		return relatorioPiaRespostaDefinida;
	}
	async findByValor(valor: string): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaDefinida =
			await prisma.relatorioPiaRespostaDefinida.findFirst({
				where: {
					valor,
				},
			});

		return relatorioPiaRespostaDefinida;
	}
	async update(
		data: UpdateRelatorioPiaRespostaDefinidaDto,
		from: RelatorioPiaRespostaDefinida,
	): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaDefinida =
			await prisma.relatorioPiaRespostaDefinida.update({
				where: {
					uid: from.uid,
				},
				data,
			});

		return relatorioPiaRespostaDefinida;
	}
	async delete(uid: string): Promise<void> {
		await prisma.relatorioPiaRespostaDefinida.delete({
			where: {
				uid,
			},
		});
	}
}
