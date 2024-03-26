import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateCargoPermissaoDto } from '../dtos/update-cargo-permissao-dto';

@Injectable()
export class UpdateCargoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string, data: UpdateCargoPermissaoDto): Promise<void> {
		await this.prisma.cargoPermissao.update({
			where: {
				uid,
			},
			data,
		});

		return;
	}
}
