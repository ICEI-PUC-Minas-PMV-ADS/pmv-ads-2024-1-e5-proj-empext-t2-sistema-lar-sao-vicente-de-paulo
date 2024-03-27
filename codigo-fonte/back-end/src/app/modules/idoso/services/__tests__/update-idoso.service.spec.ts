import { InMemoryIdosoRepository } from '@/app/modules/usuario/repositories/in-memory/in-memory-idoso-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { AppError } from '@utils/app-error';
import { UpdateIdosoService } from '../update-idoso.service';
import { UpdateIdosoDto } from '../../dtos/update-idoso.dto';

let idosoRepository: InMemoryIdosoRepository;
let sut: UpdateIdosoService;
let existingIdoso;

describe('Atualizar Idoso Caso de Uso', async () => {
	beforeEach(async () => {
		idosoRepository = new InMemoryIdosoRepository();
		sut = new UpdateIdosoService(idosoRepository);

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

	it('deve atualizar os dados do idoso com sucesso.', async () => {
		const newIdosoData: UpdateIdosoDto = {
			nome_completo: 'Nome novo',
			cpf: '12345678910',
		};

		await sut.execute(newIdosoData, existingIdoso.uid);

		const updatedIdoso = await idosoRepository.findByUid(existingIdoso.uid);

		expect(updatedIdoso).toMatchObject(newIdosoData);
	});

	it('deve lançar um erro ao tentar atualizar um idoso que não existe.', async () => {
		const nonExistingIdosoUid = 'non-existing-uid';

		const newIdosoData: UpdateIdosoDto = {
			nome_completo: 'Nome novo',
			cpf: '12345678910',
		};

		await expect(
			sut.execute(newIdosoData, nonExistingIdosoUid),
		).rejects.toThrow(AppError);
	});
});
