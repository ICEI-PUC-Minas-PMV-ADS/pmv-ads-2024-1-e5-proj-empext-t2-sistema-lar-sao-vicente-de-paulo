import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AuthRedefinirSenhaDto } from '../dtos/redefinir-senha.dto';
import { PrismaService } from '@/database/prisma.service';
import { AwsSesService } from '@/core/providers/mail/aws-ses.service';
import { AppError } from '@utils/app-error';
import { BcryptService } from '@/core/providers/bcrypt/bcrypt.service';

import * as crypto from 'crypto';

interface IContentCodigo {
	id_usuario: bigint;
	id_empresa: bigint;
}

@Injectable()
export class AuthRedefinirSenhaService {
	constructor(
		@InjectRedis() private readonly redis: Redis,
		private prisma: PrismaService,
		private mail: AwsSesService,
		private bcrypt: BcryptService,
	) {}

	async execute({ email, codigo, senha }: AuthRedefinirSenhaDto) {
		const usuario = await this.prisma.usuario.findFirst({
			where: {
				email,
			},
		});

		if (!usuario) throw new AppError('Usuário não encontrado');
		if (usuario.situacao !== 'ATIVO') throw new AppError('Usuário inativo');

		if (!codigo) {
			const newCodigo = crypto.randomInt(100000, 1000000).toString();

			await this.redis.set(
				newCodigo,
				JSON.stringify({
					id_usuario: usuario.id,
				} as IContentCodigo),
				'EX',
				60 * 30, // 30 minutos
			);

			await this.mail.sendText({
				subject: 'Redefinição de senha',
				text: 'Segue o código de recuperação da senha: ' + newCodigo,
				to: usuario.email,
			});

			return;
		}

		const codigoExist = await this.redis.get(codigo);

		if (!codigoExist) throw new AppError('Código inválido');

		const contentCodigo = JSON.parse(codigoExist) as IContentCodigo;

		if (BigInt(contentCodigo.id_usuario) !== usuario.id)
			throw new AppError('Código inválido');

		const hash = await this.bcrypt.generateHash(senha);

		await this.prisma.usuario.update({
			where: {
				id: usuario.id,
			},
			data: {
				senha: hash,
			},
		});

		await this.redis.del(codigo);

		return;
	}
}
