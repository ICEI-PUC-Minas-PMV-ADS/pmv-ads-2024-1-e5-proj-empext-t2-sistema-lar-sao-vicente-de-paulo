import { Injectable } from '@nestjs/common';
import { CreateIdosoDto } from '../dtos/create-idoso.dto';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { AppError } from '@utils/app-error';
import { PrismaIdosoRepository } from '../repositories/prisma/prisma-idoso-repository';

@Injectable()
export class CreateIdosoService {
	constructor(
		private idosoRepository: PrismaIdosoRepository,
		private usuarioRepository: PrismaUsuarioRepository,
	) {}

	async execute(
		data: CreateIdosoDto,
		id_usuario: bigint,
	): Promise<{ uid: string; id: bigint }> {
		const usuario = await this.usuarioRepository.findById(id_usuario);

		if (!usuario) {
			throw new AppError('Usuário não encontrado');
		}

		if (data.cpf) {
			const idosoWithSameCpf = await this.idosoRepository.findByCpf(
				data.cpf,
			);

			if (idosoWithSameCpf) {
				throw new AppError('Idoso já cadastrado com o mesmo CPF');
			}
		}

		if (data.cnh) {
			const idosoWithSameCnh = await this.idosoRepository.findByCnh(
				data.cnh,
			);

			if (idosoWithSameCnh) {
				throw new AppError('Idoso já cadastrado com o mesmo CNH');
			}
		}
		if (data.rg) {
			const idosoWithSameRg = await this.idosoRepository.findByRg(
				data.rg,
			);

			if (idosoWithSameRg) {
				throw new AppError('Idoso já cadastrado com o mesmo RG');
			}
		}

		const idoso = await this.idosoRepository.create({
			...data,
			id_usuario: id_usuario,
		});

		return { uid: idoso.uid, id: idoso.id };
	}
}
