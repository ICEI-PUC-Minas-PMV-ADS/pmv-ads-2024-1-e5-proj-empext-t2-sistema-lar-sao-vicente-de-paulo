import { prisma } from '@/core/providers/database/prisma.service';
import { CreateRelatorioPiaDto } from '../../dtos/create-relatorio-pia.dto';
import { UpdateRelatorioPiaDto } from '../../dtos/update-relatorio-pia.dto';
import { RelatorioPia } from '../../entities/relatorio-pia.entity';
import { relatorioPiaRepository } from '../relatorio-pia.repository';

export class PrismaRelatorioPiaRepository implements relatorioPiaRepository {
	async create(data: CreateRelatorioPiaDto): Promise<RelatorioPia> {
		const RelatorioPia = await prisma.relatorioPia.create({
			data,
		});

		return RelatorioPia;
	}
	async findByUid(uid: string): Promise<RelatorioPia> {
		const RelatorioPia = await prisma.relatorioPia.findUnique({
			where: {
				uid,
			},
			include: {
				modelo_relatorio_pia: true,
				usuario: true,
				idoso: true,
				relatorio_pia_pergunta: true,
			},
		});

		return RelatorioPia;
	}
	async update(
		data: UpdateRelatorioPiaDto,
		from: RelatorioPia,
	): Promise<RelatorioPia> {
		const RelatorioPia = await prisma.relatorioPia.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return RelatorioPia;
	}
	async delete(uid: string): Promise<void> {
		await prisma.relatorioPia.delete({
			where: {
				uid,
			},
		});
	}
}
