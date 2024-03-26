import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { AppError } from '@/common/utils/app-error';
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';
import { Usuario } from '../entities/usuario.entity';

interface RegisterUseCaseResponse {
	usuario: Usuario;
}

@Injectable()
export class CreateUsuarioService {
	constructor(
		private usuarioRepository: PrismaUsuarioRepository,
		private bcrypt: BcryptService,
	) {}

	async execute(data: CreateUsuarioDto): Promise<RegisterUseCaseResponse> {
		const hash = await this.bcrypt.generateHash(data.senha);

		const usuarioExist = await this.usuarioRepository.alreadyExists(
			data.email,
			data.cpf_cnh,
		);

		if (usuarioExist) throw new AppError('Usuário já cadastrado');

		const usuario = await this.usuarioRepository.create({
			...data,
			senha: hash,
		});

		return {
			usuario,
		};
	}
}
