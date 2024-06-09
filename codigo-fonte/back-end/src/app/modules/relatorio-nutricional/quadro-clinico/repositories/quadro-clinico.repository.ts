import { QuadroClinico } from '@prisma/client';
import { CreateQuadroClinicoDto } from '../dtos/create-quadro-clinico.dto';
import { UpdateQuadroClinicoDto } from '../dtos/update-quadro-clinico.dto';

export interface quadroClinicoRepository {
	create(data: CreateQuadroClinicoDto): Promise<QuadroClinico>;
	findById(id: bigint): Promise<QuadroClinico | null>;
	findByUid(uid: string): Promise<QuadroClinico | null>;
	update(
		data: UpdateQuadroClinicoDto,
		from: QuadroClinico,
	): Promise<QuadroClinico>;
	delete(uid: string): Promise<void>;
}
