import { Injectable } from '@nestjs/common';
import { PrismaRelatorioPiaRepository } from '../repositories/prisma/prisma-relatorio-pia.repository';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { AppError } from '@utils/app-error';

@Injectable()
export class FindUidRelatorioPiaService {
	constructor(private relatorioPiaRepository: PrismaRelatorioPiaRepository) {}

	async execute(uid: string): Promise<RelatorioPia | null> {
		const relatorioPia = await this.relatorioPiaRepository.findByUid(uid);

		if (!relatorioPia) {
			throw new AppError('Relatório PIA não encontrado');
		}

		return relatorioPia;
	}
}
