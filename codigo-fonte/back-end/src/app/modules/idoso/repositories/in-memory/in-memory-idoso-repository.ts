import { Idoso, Prisma } from '@prisma/client';
import { idosoRepository } from '../idoso.repository';
import { DeleteIdosoDto } from '@/app/modules/idoso/dtos/delete-idoso.dto';
import { UpdateIdosoDto } from '@/app/modules/idoso/dtos/update-idoso.dto';
import { randomUUID } from 'crypto';
interface IdosoComArrays extends Idoso {
	responsaveis_idoso: any[];
	prontuarios: any[];
	relatorios_pia: any[];
	fichas_nutricionais: any[];
	perroca: any[];
	escala_braden: any[];
}

export class InMemoryIdosoRepository implements idosoRepository {
	private idososArray: IdosoComArrays[] = [];

	async create(data: Prisma.IdosoUncheckedCreateInput) {
		const idoso: IdosoComArrays = {
			id: data.id ? BigInt(data.id) : undefined,
			uid: randomUUID(),
			id_usuario: data.id ? BigInt(data.id) : undefined,
			foto: data.foto,
			nome_completo: data.nome_completo,
			data_nascimento: new Date(data.data_nascimento),
			naturalidade: data.naturalidade,
			estado: data.estado,
			cidade: data.cidade,
			estado_civil: data.estado_civil,
			religiao: data.religiao,
			escolaridade: data.escolaridade,
			nome_pai: data.nome_pai,
			nome_mae: data.nome_mae,
			data_ingresso: new Date(data.data_ingresso),
			cpf: data.cpf,
			cnh: data.cnh,
			rg: data.rg,
			rg_orgao_expedidor: data.rg_orgao_expedidor,
			apelido: data.apelido,
			genero: data.genero,
			cartao_sus: data.cartao_sus,
			titulo_eleitor: data.titulo_eleitor,
			titulo_eleitor_secao: data.titulo_eleitor_secao,
			titulo_eleitor_zona: data.titulo_eleitor_zona,
			certidao_nascimento_folha: data.certidao_nascimento_folha,
			certidao_nascimento_livro: data.certidao_nascimento_livro,
			certidao_casamento_folha: data.certidao_casamento_folha,
			certidao_casamento_livro: data.certidao_casamento_livro,
			situacao: 'ATIVO',
			motivo_inativacao: data.motivo_inativacao,
			criado_em: new Date(),
			atualizado_em: new Date(),
			responsaveis_idoso: [],
			prontuarios: [],
			relatorios_pia: [],
			fichas_nutricionais: [],
			perroca: [],
			escala_braden: [],
		};

		this.idososArray.push(idoso);

		return idoso;
	}

	async findByCpf(cpf: string) {
		return this.idososArray.find((usuario) => usuario.cpf === cpf) || null;
	}
	async findByUid(uid: string) {
		return this.idososArray.find((idoso) => idoso.uid === uid) || null;
	}
	async update(data: UpdateIdosoDto, from: Idoso): Promise<Idoso> {
		const idosoIndex = this.idososArray.findIndex(
			(item) => item.uid === from.uid,
		);
		if (idosoIndex === -1) {
			throw new Error('Nenhum idoso encontrado');
		}
		const idoso = this.idososArray[idosoIndex];
		this.idososArray[idosoIndex] = {
			...idoso,
			...data,
			atualizado_em: new Date(),
		};
		return this.idososArray[idosoIndex];
	}
	async delete(data: DeleteIdosoDto, from: Idoso) {
		const idosoIndex = this.idososArray.findIndex(
			(item) => item.uid === from.uid,
		);

		if (idosoIndex === -1) {
			throw new Error('Idoso not found.');
		}

		const idoso = this.idososArray[idosoIndex];
		this.idososArray[idosoIndex] = {
			...idoso,
			...data,
		};

		return this.idososArray[idosoIndex];
	}
}
