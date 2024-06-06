import { AntropometriaNutricional } from '@prisma/client';
import { CreateAntropometriaDto } from '../dtos/create-antropometria.dto';
import { UpdateAntropometriaDto } from '../dtos/update-antropometria.dto';

export interface antropometriaRepository {
	create(data: CreateAntropometriaDto): Promise<AntropometriaNutricional>;
	findById(id: bigint): Promise<AntropometriaNutricional | null>;
	findByUid(uid: string): Promise<AntropometriaNutricional | null>;
	update(
		data: UpdateAntropometriaDto,
		from: AntropometriaNutricional,
	): Promise<AntropometriaNutricional>;
	delete(uid: string): Promise<void>;
}
