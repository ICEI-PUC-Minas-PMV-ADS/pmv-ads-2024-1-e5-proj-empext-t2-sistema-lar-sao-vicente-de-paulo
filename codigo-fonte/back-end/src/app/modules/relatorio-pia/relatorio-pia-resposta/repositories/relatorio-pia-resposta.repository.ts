import { $Enums } from '@prisma/client';
import { CreateRelatorioPiaRespostaDto } from '../dtos/create-relatorio-pia-resposta.dto';
import { UpdateRelatorioPiaRespostaDto } from '../dtos/update-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

export interface relatorioPiaRespostaRepository {
	create(data: CreateRelatorioPiaRespostaDto): Promise<RelatorioPiaResposta>;
	findByUid(uid: string): Promise<RelatorioPiaResposta | null>;
	findById(id: bigint): Promise<RelatorioPiaResposta | null>;
	findByTitulo(titulo: string): Promise<RelatorioPiaResposta | null>;
	findByTipo(tipo: $Enums.tiposReposta): Promise<RelatorioPiaResposta | null>;
	update(
		data: UpdateRelatorioPiaRespostaDto,
		from: RelatorioPiaResposta,
	): Promise<RelatorioPiaResposta>;
	delete(uid: string): Promise<void>;
}
