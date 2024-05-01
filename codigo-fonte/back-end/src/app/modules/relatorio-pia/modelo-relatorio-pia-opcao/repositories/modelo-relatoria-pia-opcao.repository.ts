import { CreateModeloRelatorioPiaOpcaoDto } from '../dtos/create-modelo-relatorio-pia-opcao.dto';
import { UpdateModeloRelatorioPiaOpcaoDto } from '../dtos/update-modelo-relatorio-pia-opcao.dto';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';

export interface modeloRelatorioPiaOpcaoRepository {
	create(
		data: CreateModeloRelatorioPiaOpcaoDto,
	): Promise<ModeloRelatorioPiaRespostaOpcao>;
	findByUid(uid: string): Promise<ModeloRelatorioPiaRespostaOpcao | null>;
	update(
		data: UpdateModeloRelatorioPiaOpcaoDto,
		from: ModeloRelatorioPiaRespostaOpcao,
	): Promise<ModeloRelatorioPiaRespostaOpcao>;
	delete(uid: string): Promise<void>;
}
