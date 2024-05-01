import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponseError } from "@/common/decorators/api-response-error.decorator";
import { FindUidModeloRelatorioPiaService } from "../services/find-uid-modelo-relatorio-pia.service";
import { ModeloRelatorioPia } from "../entities/modelo-relatorio-pia.entity";

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class FindUidModeloRelatorioPiaController {
    constructor(private findUidModeloRelatorioPiaService: FindUidModeloRelatorioPiaService) {}
    
    @Get(':uid')
    @ApiOperation({ summary: 'Busca um modelo de relatório PIA pelo UID' })
    @ApiParam({
		name: 'uid',
		description: 'UID do modelo de relatório PIA a ser buscado',
		type: 'string',
    })

    @ApiResponseError()
    async handle(@Param('uid') uid: string): Promise<ModeloRelatorioPia | null> {
        const modeloRelatorioPia = await this.findUidModeloRelatorioPiaService.execute(uid);

        return modeloRelatorioPia;
    }
}