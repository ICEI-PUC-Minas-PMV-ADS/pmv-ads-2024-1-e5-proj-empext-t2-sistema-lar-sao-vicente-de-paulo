import { Injectable } from '@nestjs/common';
import { AuthDefinirSenhaDto } from '../dtos/definir-senha.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { AppError } from '@utils/app-error';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';
import { PrismaService } from '@/core/providers/database/prisma.service';
import * as crypto from 'crypto';
import { emailDefinirSenha } from '@/common/templates/email/emailDefinirSenha';
import { UmblerService } from '@/core/providers/mail/umbler/umbler.service';

interface IContentCodigo {
	id_usuario: bigint;
}

@Injectable()
export class AuthDefinirSenhaService {
	constructor(
		@InjectRedis() private readonly redis: Redis,
		private prisma: PrismaService,
		private bcrypt: BcryptService,
		private mail: UmblerService,
	) {}

	async execute({ uid, codigo, senha }: AuthDefinirSenhaDto) {
		const usuario = await this.prisma.usuario.findFirst({
			where: {
				uid,
			},
		});

		if (!usuario) throw new AppError('Usuário não encontrado');
		if (usuario.situacao !== 'ATIVO') throw new AppError('Usuário inativo');

		if (!codigo) {
			const newCodigo = crypto.randomInt(100000, 1000000).toString();
			const urlDefinicaoSenha = `${
				process.env.BASE_URL_APP ||
				'https://sistema-lar-sao-vicente-de-paulo-frontend.onrender.com'
			}/definir-senha?for=${uid}&code=${newCodigo}`;

			await this.redis.set(
				newCodigo,
				JSON.stringify({
					id_usuario: usuario.id,
				} as IContentCodigo),
				'EX',
				60 * 30, // 30 minutos
			);

			await this.mail.sendHtml({
				subject: 'Definir senha | Sistema de Acompanhamento de Idosos',
				html: emailDefinirSenha(usuario.nome, urlDefinicaoSenha),
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
