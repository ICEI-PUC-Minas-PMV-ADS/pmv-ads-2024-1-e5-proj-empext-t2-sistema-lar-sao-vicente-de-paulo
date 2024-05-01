import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponseError } from "@/common/decorators/api-response-error.decorator";
import { FindUidModeloRelatorioPiaPerguntaService } from "../services/find-uid-modelo-relatorio-pia-pergunta.service";
import { ModeloRelatorioPiaPergunta } from "../entities/modelo-relatorio-pia-pergunta.entity";

@ApiTags('modelo-relatorio-pia-pergunta')
@Controller('modelo-relatorio-pia-pergunta')
@ApiBearerAuth()
export class FindUidModeloRelatorioPiaPerguntaController {
    constructor(private findUidModeloRelatorioPiaPerguntaService: FindUidModeloRelatorioPiaPerguntaService) {}
    
    @Get(':uid')
    @ApiOperation({ summary: 'Busca um modelo de pergunta pelo UID' })
    @ApiParam({
		name: 'uid',
		description: 'UID do modelo de pergunta a ser buscado',
		type: 'string',
    })

    @ApiResponseError()
    async handle(@Param('uid') uid: string): Promise<ModeloRelatorioPiaPergunta | null> {
        const modeloRelatorioPiaPergunta = await this.findUidModeloRelatorioPiaPerguntaService.execute(uid);

        return modeloRelatorioPiaPergunta;
    }
}