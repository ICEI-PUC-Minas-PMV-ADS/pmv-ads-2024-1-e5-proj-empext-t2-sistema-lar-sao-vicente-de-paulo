import { InMemoryUsuarioRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-usuario-repository';
import { CreateUsuarioService } from '../create-usuario.service';
import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcrypt';
import { AppError } from '@/common/utils/app-error';
import { BcryptService } from '@/core/providers/crypto/bcrypt/bcrypt.service';

let usuarioRepository: InMemoryUsuarioRepository;
let bcrypt: BcryptService;
let sut: CreateUsuarioService;

describe('Criar Usuario Caso de Uso', () => {
	beforeEach(() => {
		usuarioRepository = new InMemoryUsuarioRepository();
		bcrypt = new BcryptService();
		sut = new CreateUsuarioService(usuarioRepository, bcrypt);
	});

	it('deveria poder se cadastrar', async () => {
		const usuario = await sut.execute({
			nome: 'John Doe',
			cpf_cnh: '11111111111',
			email: 'johndoe@example.com',
			senha: '123456',
			id_cargo: BigInt(1),
		});

		expect(usuario.uid).toEqual(expect.any(String));
	});

	it('deve usuário no momento do registro ter uma hash senha', async () => {
		const usuario = await sut.execute({
			nome: 'John Doe',
			cpf_cnh: '11111111111',
			email: 'johndoe@example.com',
			senha: '123456',
			id_cargo: BigInt(1),
		});

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			usuario.senha,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('não deve ser possível registrar-se com o mesmo e-mail duas vezes', async () => {
		const email = 'johndoe@example.com';

		await sut.execute({
			nome: 'John Doe',
			cpf_cnh: '11111111111',
			email,
			senha: '123456',
			id_cargo: BigInt(1),
		});

		await expect(() =>
			sut.execute({
				nome: 'John Doe',
				cpf_cnh: '11111111111',
				email,
				senha: '123456',
				id_cargo: BigInt(1),
			}),
		).rejects.toThrow(AppError);
	});

	it('não deveria conseguir se cadastrar duas vezes no mesmo cpf_cnh', async () => {
		const cpf_cnh = '11111111111';

		await sut.execute({
			nome: 'John Doe',
			cpf_cnh,
			email: 'johndoe@example.com',
			senha: '123456',
			id_cargo: BigInt(1),
		});

		await expect(() =>
			sut.execute({
				nome: 'John Doe',
				cpf_cnh,
				email: 'johndoe@example.com',
				senha: '123456',
				id_cargo: BigInt(1),
			}),
		).rejects.toThrow(AppError);
	});
});
