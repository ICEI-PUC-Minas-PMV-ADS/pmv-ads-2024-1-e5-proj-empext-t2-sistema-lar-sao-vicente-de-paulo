import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AuthRedefinirSenhaDto } from '../dtos/redefinir-senha.dto';
import { AppError } from '@utils/app-error';
import * as crypto from 'crypto';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';
import { ResendService } from '@/core/providers/mail/resend/resend.service';
import { emailRedefinirSenha } from '@/common/templates/email/emailRedefinirSenha';

interface IContentCodigo {
	id_usuario: bigint;
	id_empresa: bigint;
}

@Injectable()
export class AuthRedefinirSenhaService {
	constructor(
		@InjectRedis() private readonly redis: Redis,
		private prisma: PrismaService,
		private mail: ResendService,
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

			await this.mail.sendHtml({
				subject:
					'Redefinição de senha | Sistema de Acompanhamento de Idosos',
				html: emailRedefinirSenha(usuario.nome, newCodigo),
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
