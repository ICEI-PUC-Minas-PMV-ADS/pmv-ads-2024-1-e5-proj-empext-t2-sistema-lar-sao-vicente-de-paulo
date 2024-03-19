import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Idoso } from '../entities/idoso.entity';

@Injectable()
export class FindAllIdososService {
    constructor(private prisma: PrismaService) { }

    async execute(
        query?: Prisma.IdosoFindManyArgs,
    ): Promise<{ count: number; idosos: Idoso[] }> {
        query.where = {
            AND: [{ ...query.where }],
        };
        const [idosos, count] = await this.prisma.$transaction([
            this.prisma.idoso.findMany(query),
            this.prisma.idoso.count({ where: query.where }),
        ]);

        return {
            count,
            idosos,
        };
    }
}
