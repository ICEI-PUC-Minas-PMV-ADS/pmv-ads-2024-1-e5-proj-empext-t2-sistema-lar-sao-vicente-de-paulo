import { Module } from '@nestjs/common';
import { ModeloRelatorioPiaModule } from './modelo-relatorio-pia/modelo-relatorio-pia.module';
import { ModeloRelatorioPiaPerguntaModule } from './modelo-relatorio-pia-perguntas/modelo-relatorio-pia-pergunta.module';
import { ModeloRelatorioPiaRespostaModule } from './modelo-relatorio-pia-resposta/modelo-relatorio-pia-resposta.module';
import { ModeloRelatorioPiaRespostaOpcaoModule } from './modelo-relatorio-pia-opcao/modelo-relatorio-pia-resposta-opcao.module';

@Module({
	imports: [
		ModeloRelatorioPiaModule,
		ModeloRelatorioPiaPerguntaModule,
		ModeloRelatorioPiaRespostaModule,
		ModeloRelatorioPiaRespostaOpcaoModule,
	],
})
export class RelatorioPiaModule {}
