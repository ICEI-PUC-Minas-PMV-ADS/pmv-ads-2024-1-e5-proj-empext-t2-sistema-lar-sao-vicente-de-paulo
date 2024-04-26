import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponseError } from "@/common/decorators/api-response-error.decorator";
import { FindUidModeloRelatorioPiaOpcaoService } from "../services/find-uid-modelo-relatorio-pia-opcao.service";
import { ModeloRelatorioPiaRespostaOpcao } from "../entities/modelo-relatorio-pia-opcao";

@ApiTags('modelo-relatorio-pia-resposta-opcao')
@Controller('modelo-relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class FindUidModeloRelatorioPiaOpcaoController {
    constructor(private findUidModeloRelatorioPiaOpcaoService: FindUidModeloRelatorioPiaOpcaoService) {}
    
    @Get(':uid')
    @ApiOperation({ summary: 'Busca um modelo de opção de resposta pelo UID' })
    @ApiParam({
		name: 'uid',
		description: 'UID do modelo de opção de resposta a ser buscado',
		type: 'string',
    })

    @ApiResponseError()
    async handle(@Param('uid') uid: string): Promise<ModeloRelatorioPiaRespostaOpcao | null> {
        const modeloRelatorioPiaOpcao = await this.findUidModeloRelatorioPiaOpcaoService.execute(uid);

        return modeloRelatorioPiaOpcao;
    }
}