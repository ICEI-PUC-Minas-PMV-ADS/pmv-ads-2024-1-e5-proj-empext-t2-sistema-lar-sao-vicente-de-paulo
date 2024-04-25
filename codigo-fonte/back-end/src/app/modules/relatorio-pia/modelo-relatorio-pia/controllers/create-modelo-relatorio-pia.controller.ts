import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateModeloRelatorioPiaService } from "../services/create-modelo-relatorio-pia.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateModeloRelatorioPiaDto } from "../dtos/create-modelo-relatorio-pia.dto";
import { ModeloRelatorioPia } from "../entities/modelo-relatorio-pia.entity";

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class CreateModeloRelatorioPiaController {
    constructor(private createModeloRelatorioPia: CreateModeloRelatorioPiaService) {}
    
    @Post()
    @ApiOperation({ summary: 'Cria um modelo de relatório de PIA' })
    @ApiBody({
        type: CreateModeloRelatorioPiaDto,
        description: 'Dados do modelo de relatório de PIA a ser criado',
    
    })

    async handle(@Body() data: CreateModeloRelatorioPiaDto): Promise<ModeloRelatorioPia> {
        const modeloRelatorioPia = await this.createModeloRelatorioPia.execute(data);
        
        return modeloRelatorioPia;
    }
}