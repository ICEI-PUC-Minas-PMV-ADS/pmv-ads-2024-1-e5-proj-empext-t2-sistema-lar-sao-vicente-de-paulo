import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Param } from "@nestjs/common";
import { ApiResponseError } from "@/common/decorators/api-response-error.decorator";
import { DeleteModeloRelatorioPiaRespostaService } from "../services/delete-modelo-relatorio-pia-resposta.service";

@ApiTags('modelo-relatorio-pia-resposta')
@Controller('modelo-relatorio-pia-resposta')
@ApiBearerAuth()
export class DeleteModeloRelatorioPiaRespostaController {
    constructor(private deleteModeloRelatorioPiaResposta: DeleteModeloRelatorioPiaRespostaService) {}
    
    @Delete(':uid')
    @ApiOperation({ summary: 'Exclui um modelo de resposta' })
    @ApiParam({
		name: 'uid',
		description: 'UID do modelo de resposta a ser excluída',
		type: 'string',
    })

    @ApiResponseError()
    async handle(@Param('uid') uid: string): Promise<void> {
        await this.deleteModeloRelatorioPiaResposta.execute(uid);
    }
}