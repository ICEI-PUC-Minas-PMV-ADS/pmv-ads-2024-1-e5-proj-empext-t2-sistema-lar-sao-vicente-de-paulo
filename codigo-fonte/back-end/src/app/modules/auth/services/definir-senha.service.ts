import { Injectable } from '@nestjs/common';
import { AuthDefinirSenhaDto } from '../dtos/definir-senha.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { AppError } from '@utils/app-error';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';
import { PrismaService } from '@/core/providers/database/prisma.service';

interface IContentCodigo {
	id_usuario: bigint;
}

@Injectable()
export class AuthDefinirSenhaService {
	constructor(
		@InjectRedis() private readonly redis: Redis,
		private prisma: PrismaService,
		private bcrypt: BcryptService,
	) {}

	async execute({ codigo, senha }: AuthDefinirSenhaDto) {
		const codigoExist = await this.redis.get(codigo);

		if (!codigoExist) throw new AppError('Código inválido');

		const contentCodigo = JSON.parse(codigoExist) as IContentCodigo;

		const hash = await this.bcrypt.generateHash(senha);

		await this.prisma.usuario.update({
			where: {
				id: contentCodigo.id_usuario,
			},
			data: {
				senha: hash,
			},
		});

		await this.redis.del(codigo);

		return;
	}
}
