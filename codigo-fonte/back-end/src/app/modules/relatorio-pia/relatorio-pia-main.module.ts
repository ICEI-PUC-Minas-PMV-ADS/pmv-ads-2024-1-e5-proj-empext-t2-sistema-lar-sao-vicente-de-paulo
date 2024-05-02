import { Module } from '@nestjs/common';
import { ModeloRelatorioPiaModule } from './modelo-relatorio-pia/modelo-relatorio-pia.module';
import { ModeloRelatorioPiaPerguntaModule } from './modelo-relatorio-pia-perguntas/modelo-relatorio-pia-pergunta.module';
import { ModeloRelatorioPiaRespostaModule } from './modelo-relatorio-pia-resposta/modelo-relatorio-pia-resposta.module';
import { ModeloRelatorioPiaRespostaOpcaoModule } from './modelo-relatorio-pia-opcao/modelo-relatorio-pia-resposta-opcao.module';
import { RelatorioPiaModule } from './relatorio-pia/relatorio-pia.module';
import { RelatorioPiaPerguntaModule } from './relatorio-pia-pergunta/relatorio-pia-pergunta.module';
import { RelatorioPiaRespostaModule } from './relatorio-pia-resposta/relatorio-pia-resposta.module';
import { RelatorioPiaOpcaoModule } from './relatorio-pia-opcao/relatorio-pia-opcao.module';

@Module({
	imports: [
		ModeloRelatorioPiaModule,
		ModeloRelatorioPiaPerguntaModule,
		ModeloRelatorioPiaRespostaModule,
		ModeloRelatorioPiaRespostaOpcaoModule,
		RelatorioPiaModule,
		RelatorioPiaPerguntaModule,
		RelatorioPiaRespostaModule,
		RelatorioPiaOpcaoModule,
	],
})
export class RelatorioPiaMainModule {}
