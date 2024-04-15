import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { AppError } from '@/common/utils/app-error';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';
import { Usuario } from '../entities/usuario.entity';


@Injectable()
export class CreateUsuarioService {
	constructor(
		private usuarioRepository: PrismaUsuarioRepository,
		private bcrypt: BcryptService,
	) {}

	async execute(data: CreateUsuarioDto): Promise<Usuario> {
		const hash = await this.bcrypt.generateHash(data.senha);

		const usuarioExistEmail =
			await this.usuarioRepository.alreadyExistsUserEmail(data.email);

		if (usuarioExistEmail)
			throw new AppError('Usuário já cadastrado com mesmo E-mail');

		const usuarioExistCPF =
			await this.usuarioRepository.alreadyExistsUserCPF(data.cpf_cnh);

		if (usuarioExistCPF)
			throw new AppError('Usuário já cadastrado com mesmo CPF');

		const usuario = await this.usuarioRepository.create({
			...data,
			senha: hash,
		});

		return usuario;
	}
}
