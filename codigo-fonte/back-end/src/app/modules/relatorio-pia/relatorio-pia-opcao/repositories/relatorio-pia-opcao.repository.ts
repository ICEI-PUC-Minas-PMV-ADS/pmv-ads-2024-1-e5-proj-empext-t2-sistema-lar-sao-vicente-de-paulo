import { CreateRelatorioPiaOpcaoDto } from '../dtos/create-relatorio-pia-opcao.dto';
import { UpdateRelatorioPiaOpcaoDto } from '../dtos/update-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

export interface relatorioPiaOpcaoRepository {
	create(
		data: CreateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao>;
	findByUid(uid: string): Promise<RelatorioPiaRespostaOpcao | null>;
	findByOption(opcao: string): Promise<RelatorioPiaRespostaOpcao | null>;
	update(
		data: UpdateRelatorioPiaOpcaoDto,
		from: RelatorioPiaRespostaOpcao,
	): Promise<RelatorioPiaRespostaOpcao>;
	delete(uid: string): Promise<void>;
}
