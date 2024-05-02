import { Injectable } from '@nestjs/common';
import { PrismaRelatorioPiaRepository } from '../repositories/prisma/prisma-relatorio-pia.repository';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { AppError } from '@utils/app-error';
import { UpdateRelatorioPiaDto } from '../dtos/update-relatorio-pia.dto';

@Injectable()
export class UpdateRelatorioPiaService {
	constructor(private relatorioPiaRepository: PrismaRelatorioPiaRepository) {}

	async execute(
		uid: string,
		data: UpdateRelatorioPiaDto,
	): Promise<RelatorioPia> {
		const alreadyExists = await this.relatorioPiaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Modelo de relatório PIA não encontrado');
		}

		const RelatorioPia = await this.relatorioPiaRepository.update(
			data,
			alreadyExists,
		);

		return RelatorioPia;
	}
}
