import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponseError } from "@/common/decorators/api-response-error.decorator";
import { CreateModeloRelatorioPiaPerguntaService } from "../services/create-modelo-relatorio-pia-pergunta.service";
import { ModeloRelatorioPiaPergunta } from "../entities/modelo-relatorio-pia-pergunta.entity";
import { CreateModeloRelatorioPiaPerguntaDto } from "../dtos/create-modelo-relatorio-pia-pergunta.dto";

@ApiTags('modelo-relatorio-pia-pergunta')
@Controller('modelo-relatorio-pia-pergunta')
@ApiBearerAuth()
export class CreateModeloRelatorioPiaPerguntaController {
    constructor(private createModeloRelatorioPiaPergunta: CreateModeloRelatorioPiaPerguntaService) {}
    
    @Post()
    @ApiOperation({ summary: 'Cria um modelo de pergunta para o modelo relatório PIA' })
    @ApiBody({
        type: CreateModeloRelatorioPiaPerguntaDto,
        description: 'Dados do modelo de pergunta a ser criado',
    
    })

    @ApiResponseError()
    async handle(@Body() data: CreateModeloRelatorioPiaPerguntaDto): Promise<ModeloRelatorioPiaPergunta> {
        const modeloRelatorioPiaPergunta = await this.createModeloRelatorioPiaPergunta.execute(data);
        
        return modeloRelatorioPiaPergunta;
    }
}