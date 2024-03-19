
import { Idoso, Prisma } from '@prisma/client';
import { idosoRepository } from "../idoso.repository";
import { randomUUID } from "crypto";
import { DeleteIdosoDto } from '@/app/modules/idoso/dtos/delete-idoso.dto';
import { UpdateIdosoDto } from '@/app/modules/idoso/dtos/update-idoso.dto';

export class InMemoryIdosoRepository implements idosoRepository {
    private items: Idoso[] = [];

    async create(data: Prisma.IdosoUncheckedCreateInput): Promise<Idoso> {
        const isodoId: bigint = BigInt(data.id ?? 0)
        const usuarioId: bigint = BigInt(data.usuario_id ?? 0)

        const idoso = {
            id: isodoId,
            uid: randomUUID(),
            usuario_id: usuarioId,
            foto: data.foto ?? null,
            nome: data.nome,
            cpf_cnh: data.cpf_cnh,
            data_admissao: new Date(),
            genero: data.genero,
            leito: data.leito,
            responsavel: data.responsavel,
            telefone_responsavel: data.telefone_responsavel,
            data_nascimento: new Date(),
            criado_em: new Date(),
            atualizado_em: new Date(),
            nome_pai: data.nome_pai,
            nome_mae: data.nome_mae,
            situacao: data.situacao,
            motivo_inativacao: data.motivo_inativacao,
        };

        this.items.push(idoso);

        return idoso;
    }

    async findByCpf(cpf: string) {
        return (
            this.items.find((usuario) => usuario.cpf_cnh === cpf) || null
        );
    }
    async findByUid(uid: string) {
        const idoso = this.items.find((usuario) => usuario.uid === uid)
        if (idoso) {
            return {
                ...idoso,
                Prontuario: [],
                RelatorioPia: [],
                FichaNutricional: [],
                Perroca: [],
                EscalaBraden: [],
            }
        }

        return null;
    }
    async update(data: UpdateIdosoDto, from: Idoso): Promise<Idoso> {
        const idosoIndex = this.items.findIndex(item => item.uid === from.uid);
        if (idosoIndex === -1) {
            throw new Error('Nenhum usuário encontrado');
        }
        const idoso = this.items[idosoIndex];
        this.items[idosoIndex] = {
            ...idoso,
            ...data,
            atualizado_em: new Date(),
        };
        return this.items[idosoIndex];
    }
    async delete(data: DeleteIdosoDto, from: Idoso) {
        const idosoIndex = this.items.findIndex(item => item.uid === from.uid);

        if (idosoIndex === -1) {
            throw new Error('Idoso not found.');
        }

        const idoso = this.items[idosoIndex];
        this.items[idosoIndex] = {
            ...idoso,
            ...data
        }

        return this.items[idosoIndex];
    }
}