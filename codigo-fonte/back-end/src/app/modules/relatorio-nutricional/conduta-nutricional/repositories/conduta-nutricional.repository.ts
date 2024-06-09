import { CondutaNutricional } from '@prisma/client';
import { CreateCondutaNutricionalDto } from '../dtos/create-conduta-nutricional.dto';
import { UpdateCondutaNutricionalDto } from '../dtos/update-conduta-nutricional.dto';

export interface condutaNutricionalRepository {
	create(data: CreateCondutaNutricionalDto): Promise<CondutaNutricional>;
	findById(id: bigint): Promise<CondutaNutricional | null>;
	findByUid(uid: string): Promise<CondutaNutricional | null>;
	update(
		data: UpdateCondutaNutricionalDto,
		from: CondutaNutricional,
	): Promise<CondutaNutricional>;
	delete(uid: string): Promise<void>;
}
