import { Module } from "@nestjs/common";
import { ModeloRelatorioPiaModule } from "./modelo-relatorio-pia/modelo-relatorio-pia.module";
import { ModeloRelatorioPiaPerguntaModule } from "./modelo-relatorio-pia-perguntas/modelo-relatorio-pia-pergunta.module";
import { ModeloRelatorioPiaRespostaModule } from "./modelo-relatorio-pia-resposta/modelo-relatorio-pia-resposta.module";

@Module({
    imports: [ModeloRelatorioPiaModule, ModeloRelatorioPiaPerguntaModule, ModeloRelatorioPiaRespostaModule]
})

export class RelatorioPiaModule {}