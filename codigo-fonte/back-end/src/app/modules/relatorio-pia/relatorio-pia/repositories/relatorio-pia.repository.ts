import { CreateRelatorioPiaDto } from '../dtos/create-relatorio-pia.dto';
import { UpdateRelatorioPiaDto } from '../dtos/update-relatorio-pia.dto';
import { RelatorioPia } from '../entities/relatorio-pia.entity';

export interface relatorioPiaRepository {
	create(data: CreateRelatorioPiaDto): Promise<RelatorioPia>;
	findByUid(uid: string): Promise<RelatorioPia | null>;
	update(
		data: UpdateRelatorioPiaDto,
		from: RelatorioPia,
	): Promise<RelatorioPia>;
	delete(uid: string): Promise<void>;
}
