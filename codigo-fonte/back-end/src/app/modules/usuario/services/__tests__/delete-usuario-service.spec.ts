import { InMemoryUsuarioRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-usuario-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { DeleteUsuarioService } from '../delete-usuario.service';
import { AppError } from '@utils/app-error';

let usuarioRepository: InMemoryUsuarioRepository;
let sut: DeleteUsuarioService;

describe('Deletar Usuario Caso de Uso', () => {
	beforeEach(async () => {
		usuarioRepository = new InMemoryUsuarioRepository();
		sut = new DeleteUsuarioService(usuarioRepository);
	});

	it('deve marcar o usuário como inativo se ele existir', async () => {
		const createdUsuario = await usuarioRepository.create({
			nome: 'John Doe',
			cpf_cnh: '11111111111',
			email: 'johndoe@example.com',
			senha: '123456',
		});

		const deletedUsuario = await sut.execute(createdUsuario.uid);

		expect(deletedUsuario.situacao).toBe('INATIVO');
	});

	it('deve lançar um erro se nenhum usuário for encontrado', async () => {
		await expect(() =>
			sut.execute('inexistent-usuario-uid'),
		).rejects.toThrow(AppError);
	});
});
