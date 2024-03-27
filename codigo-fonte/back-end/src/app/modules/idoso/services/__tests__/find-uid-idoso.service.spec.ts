import { InMemoryIdosoRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-idoso-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { AppError } from '@utils/app-error';
import { FindUidIdosoService } from '../find-uid-idoso.service';

let idosoRepository: InMemoryIdosoRepository;
let sut: FindUidIdosoService;
let existingIdoso;

describe('Buscar UID Idoso Caso de Uso', async () => {
	beforeEach(async () => {
		idosoRepository = new InMemoryIdosoRepository();
		sut = new FindUidIdosoService(idosoRepository);

		existingIdoso = await idosoRepository.create({
			usuario_id: 1,
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

	it('deve encontrar um idoso pelo UID.', async () => {
		const foundIdoso = await sut.execute(existingIdoso.uid);

		expect(foundIdoso.uid).toEqual(existingIdoso.uid);
	});

	it('deve retornar nulo ao tentar encontrar um idoso pelo UID que não existe', async () => {
		const nonExistingIdosoUid = 'non-existing-uid';

		await expect(sut.execute(nonExistingIdosoUid)).rejects.toThrow(
			AppError,
		);
	});
});
