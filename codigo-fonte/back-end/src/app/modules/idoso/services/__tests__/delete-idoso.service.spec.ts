import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsuarioRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-usuario-repository';
import { DeleteIdosoService } from '../delete-idoso.service';
import { DeleteIdosoDto } from '../../dtos/delete-idoso.dto';
import { AppError } from '@utils/app-error';
import { Situacao } from '@prisma/client';
import { InMemoryIdosoRepository } from '../../repositories/in-memory/in-memory-idoso-repository';

let idosoRepository: InMemoryIdosoRepository;
let usuarioRepository: InMemoryUsuarioRepository;
let sut: DeleteIdosoService;
let existingIdoso;

describe('Remoção Idoso Caso de Uso', async () => {
	beforeEach(async () => {
		idosoRepository = new InMemoryIdosoRepository();
		usuarioRepository = new InMemoryUsuarioRepository();
		sut = new DeleteIdosoService(idosoRepository);

		existingIdoso = await idosoRepository.create({
			id_usuario: 1,
			nome_completo: 'João da Silva',
			data_nascimento: '1970-01-01',
			naturalidade: 'Cidade Fictícia',
			estado: 'Estado Fictício',
			pais: 'País Fictício',
			estado_civil: 'Solteiro(a)',
			religiao: 'Religião Fictícia',
			escolaridade: 'Ensino Médio Completo',
			nome_pai: 'Pai do João',
			nome_mae: 'Mãe do João',
			data_ingresso: '2020-01-01',
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
	});

	it('deve excluir o idoso com sucesso.', async () => {
		const data: DeleteIdosoDto = {
			situacao: Situacao.INATIVO,
			motivo_inativacao: 'TRANSFERIDO',
		};

		const deletedIdoso = await sut.execute(data, existingIdoso.uid);

		expect(deletedIdoso.situacao).toBe('INATIVO');
	});

	it('deve lançar um erro ao tentar excluir um idoso que não existe.', async () => {
		const nonExistingIdosoUid = 'non-existing-uid';

		const data: DeleteIdosoDto = {
			situacao: 'INATIVO',
			motivo_inativacao: 'TRANSFERIDO',
		};

		await expect(sut.execute(data, nonExistingIdosoUid)).rejects.toThrow(
			AppError,
		);
	});
});
