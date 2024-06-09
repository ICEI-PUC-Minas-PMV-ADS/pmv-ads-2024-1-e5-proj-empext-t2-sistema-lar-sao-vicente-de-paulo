import { SemiologiaNutricional } from '@prisma/client';
import { CreateSemiologiaNutricionalDto } from '../dtos/create-semiologia-nutricional.dto';
import { UpdateSemiologiaNutricionalDto } from '../dtos/update-semiologia-nutricional.dto';

export interface semiologiaNutricionalRepository {
	create(
		data: CreateSemiologiaNutricionalDto,
	): Promise<SemiologiaNutricional>;
	findById(id: bigint): Promise<SemiologiaNutricional | null>;
	findByUid(uid: string): Promise<SemiologiaNutricional | null>;
	update(
		data: UpdateSemiologiaNutricionalDto,
		from: SemiologiaNutricional,
	): Promise<SemiologiaNutricional>;
	delete(uid: string): Promise<void>;
}
