import { CreateRelatorioPiaPerguntaDto } from '../dtos/create-relatorio-pia-pergunta.dto';
import { UpdateRelatorioPiaPerguntaDto } from '../dtos/update-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

export interface relatorioPiaPerguntaRepository {
	create(data: CreateRelatorioPiaPerguntaDto): Promise<RelatorioPiaPergunta>;
	findByUid(uid: string): Promise<RelatorioPiaPergunta | null>;
	findById(id: bigint): Promise<RelatorioPiaPergunta | null>;
	findByPergunta(pergunta: string): Promise<RelatorioPiaPergunta | null>;
	update(
		data: UpdateRelatorioPiaPerguntaDto,
		from: RelatorioPiaPergunta,
	): Promise<RelatorioPiaPergunta>;
	delete(uid: string): Promise<void>;
}
