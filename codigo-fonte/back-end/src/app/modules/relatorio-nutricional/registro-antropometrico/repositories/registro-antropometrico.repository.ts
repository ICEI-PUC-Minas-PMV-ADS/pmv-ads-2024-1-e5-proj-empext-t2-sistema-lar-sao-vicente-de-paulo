import { RegistroAntropometrico } from '@prisma/client';
import { CreateRegistroAntropometricoDto } from '../dtos/create-registro-antropometrico.dto';
import { UpdateRegistroAntropometricoDto } from '../dtos/update-registro-antropometrico.dto';

export interface registroAntropometricoRepository {
	create(
		data: CreateRegistroAntropometricoDto,
	): Promise<RegistroAntropometrico>;
	findById(id: bigint): Promise<RegistroAntropometrico | null>;
	findByUid(uid: string): Promise<RegistroAntropometrico | null>;
	update(
		data: UpdateRegistroAntropometricoDto,
		from: RegistroAntropometrico,
	): Promise<RegistroAntropometrico>;
	delete(uid: string): Promise<void>;
}
