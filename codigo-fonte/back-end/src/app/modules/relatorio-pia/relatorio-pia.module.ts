import { Module } from "@nestjs/common";
import { ModeloRelatorioPiaModule } from "./modelo-relatorio-pia/modelo-relatorio-pia.module";
import { ModeloRelatorioPiaPerguntaModule } from "./modelo-relatorio-pia-perguntas/modelo-relatorio-pia-pergunta.module";

@Module({
    imports: [ModeloRelatorioPiaModule, ModeloRelatorioPiaPerguntaModule]
})

export class RelatorioPiaModule {}