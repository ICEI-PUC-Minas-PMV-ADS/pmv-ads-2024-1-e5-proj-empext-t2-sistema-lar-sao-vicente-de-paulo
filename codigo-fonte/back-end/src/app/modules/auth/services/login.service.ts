import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from '../dtos/login.dto';
import { AppError } from '@/common/utils/app-error';

import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { BcryptService } from '@/core/providers/bcrypt/bcrypt.service';

@Injectable()
export class AuthLoginService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		@InjectRedis() private readonly redis: Redis,
		private bcrypt: BcryptService,
	) {}

	async execute({ email, senha }: AuthLoginDto) {
		const usuario = await this.prisma.usuario.findFirst({
			where: {
				email,
			},
			include: {
				cargo: {
					include: {
						cargo_permissao: {
							include: {
								permissao: true,
							},
						},
					},
				},
			},
		});

		if (!usuario) throw new AppError('Usuário não encontrado');

		if (usuario.situacao === 'INATIVO')
			throw new AppError('Usuário inativo');

		const isMatch = await this.bcrypt.compareHash(senha, usuario.senha);

		if (!isMatch) throw new AppError('Credenciais inválidas');

		const payload = {
			usuario: {
				id: usuario.id,
				uid: usuario.uid,
				situacao: usuario.situacao,
			},
		};

		const token = await this.jwtService.signAsync(payload);

		await this.redis.set(
			token,
			JSON.stringify({
				token,
				usuario: usuario,
			}),
			'EX',
			60 * 60 * 24 * 7, // 7 dias,
		);

		return {
			token,
			usuario,
		};
	}
}
