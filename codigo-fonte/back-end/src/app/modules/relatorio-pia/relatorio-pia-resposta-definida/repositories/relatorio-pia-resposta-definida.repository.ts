import { CreateRelatorioPiaRespostaDefinidaDto } from '../dtos/create-relatorio-pia-resposta-definida.dto';
import { UpdateRelatorioPiaRespostaDefinidaDto } from '../dtos/update-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

export interface relatorioPiaRespostaDefinidaRepository {
	create(
		data: CreateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida>;
	findByUid(uid: string): Promise<RelatorioPiaRespostaDefinida | null>;
	update(
		data: UpdateRelatorioPiaRespostaDefinidaDto,
		from: RelatorioPiaRespostaDefinida,
	): Promise<RelatorioPiaRespostaDefinida>;
	delete(uid: string): Promise<void>;
}
