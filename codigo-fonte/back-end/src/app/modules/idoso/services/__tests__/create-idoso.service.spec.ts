import { InMemoryIdosoRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-idoso-repository';
import { CreateIdosoService } from '../create-idoso.service';
import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsuarioRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-usuario-repository';
import { AppError } from '@utils/app-error';

let idosoRepository: InMemoryIdosoRepository;
let usuarioRepository: InMemoryUsuarioRepository;
let sut: CreateIdosoService;
let existingUsuario;

describe('Criação Idoso Caso de Uso', async () => {
	beforeEach(async () => {
		idosoRepository = new InMemoryIdosoRepository();
		usuarioRepository = new InMemoryUsuarioRepository();
		sut = new CreateIdosoService(idosoRepository, usuarioRepository);

		existingUsuario = await usuarioRepository.create({
			nome: 'John Doe',
			email: 'johndoe@example.com',
			cpf_cnh: '12345678910',
			senha: '123456',
		});
	});

	it('deve criar um novo idoso.', async () => {
		const idoso = await sut.execute({
			id_usuario: existingUsuario.id,
			nome_completo: 'João da Silva',
			data_nascimento: new Date(),
			naturalidade: 'Cidade Fictícia',
			estado: 'Estado Fictício',
			pais: 'País Fictício',
			estado_civil: 'Solteiro(a)',
			religiao: 'Religião Fictícia',
			escolaridade: 'Ensino Médio Completo',
			nome_pai: 'Pai do João',
			nome_mae: 'Mãe do João',
			data_ingresso: new Date(),
			cpf: '123.456.789-00',
			cnh: '123456789',
			rg: '1234567',
			rg_orgao_expedidor: 'SSP',
			titulo_eleitor: '987654321',
			titulo_eleitor_secao: '1234',
			titulo_eleitor_zona: '5678',
			certidao_nascimento: '123456789',
			certidao_nascimento_folha: '567',
			certidao_nascimento_livro: '123',
			certidao_casamento: '987654321',
			certidao_casamento_folha: '321',
			certidao_casamento_livro: '789',
		});
		expect(idoso.uid).toEqual(expect.any(String));
	});

	it('deve lançar um erro ao tentar criar um idoso com CPF existente.', async () => {
		const cpf = '12345678901';

		await sut.execute({
			id_usuario: existingUsuario.id,
			nome_completo: 'João da Silva',
			data_nascimento: new Date(),
			naturalidade: 'Cidade Fictícia',
			estado: 'Estado Fictício',
			pais: 'País Fictício',
			estado_civil: 'Solteiro(a)',
			religiao: 'Religião Fictícia',
			escolaridade: 'Ensino Médio Completo',
			nome_pai: 'Pai do João',
			nome_mae: 'Mãe do João',
			data_ingresso: new Date(),
			cpf: cpf,
			cnh: '123456789',
			rg: '1234567',
			rg_orgao_expedidor: 'SSP',
			titulo_eleitor: '987654321',
			titulo_eleitor_secao: '1234',
			titulo_eleitor_zona: '5678',
			certidao_nascimento: '123456789',
			certidao_nascimento_folha: '567',
			certidao_nascimento_livro: '123',
			certidao_casamento: '987654321',
			certidao_casamento_folha: '321',
			certidao_casamento_livro: '789',
		});

		await expect(() =>
			sut.execute({
				id_usuario: existingUsuario.id,
				nome_completo: 'João da Silva',
				data_nascimento: new Date(),
				naturalidade: 'Cidade Fictícia',
				estado: 'Estado Fictício',
				pais: 'País Fictício',
				estado_civil: 'Solteiro(a)',
				religiao: 'Religião Fictícia',
				escolaridade: 'Ensino Médio Completo',
				nome_pai: 'Pai do João',
				nome_mae: 'Mãe do João',
				data_ingresso: new Date(),
				cpf: cpf,
				cnh: '123456789',
				rg: '1234567',
				rg_orgao_expedidor: 'SSP',
				titulo_eleitor: '987654321',
				titulo_eleitor_secao: '1234',
				titulo_eleitor_zona: '5678',
				certidao_nascimento: '123456789',
				certidao_nascimento_folha: '567',
				certidao_nascimento_livro: '123',
				certidao_casamento: '987654321',
				certidao_casamento_folha: '321',
				certidao_casamento_livro: '789',
			}),
		).rejects.toThrow(AppError);
	});
});
