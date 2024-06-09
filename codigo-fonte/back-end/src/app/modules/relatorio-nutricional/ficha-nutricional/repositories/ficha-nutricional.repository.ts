import { FichaNutricional } from '@prisma/client';
import { CreateFichaNutricionalDto } from '../dtos/create-ficha-nutricional';
import { UpdateFichaNutricionalDto } from '../dtos/update-ficha-nutricional';

export interface fichaNutricionalRepository {
	create(data: CreateFichaNutricionalDto): Promise<FichaNutricional>;
	findById(id: bigint): Promise<FichaNutricional | null>;
	findByUid(uid: string): Promise<FichaNutricional | null>;
	update(
		data: UpdateFichaNutricionalDto,
		from: FichaNutricional,
	): Promise<FichaNutricional>;
	delete(uid: string): Promise<void>;
}
