import { Module } from "@nestjs/common";
import { ModeloRelatorioPiaModule } from "./modelo-relatorio-pia/modelo-relatorio-pia.module";

@Module({
    imports: [ModeloRelatorioPiaModule]
})

export class RelatorioPiaModule {}