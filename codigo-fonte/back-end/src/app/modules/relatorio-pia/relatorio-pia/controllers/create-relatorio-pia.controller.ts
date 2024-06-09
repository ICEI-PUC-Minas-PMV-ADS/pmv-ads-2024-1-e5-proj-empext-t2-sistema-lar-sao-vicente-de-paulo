import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRelatorioPiaDto } from '../dtos/create-relatorio-pia.dto';
import { CreateRelatorioPiaService } from '../services/create-relatorio-pia.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { RoleRelatorioPia } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class CreateRelatorioPiaController {
	constructor(private createRelatorioPia: CreateRelatorioPiaService) {}

	@Post()
	@Roles(RoleRelatorioPia.CREATE)
	@ApiOperation({ summary: 'Cria um Relatório PIA' })
	@ApiBody({
		type: CreateRelatorioPiaDto,
		description: 'Dados do Relatório PIA a ser criado',
	})
	@ApiResponseError()
	async handle(@Body() data: CreateRelatorioPiaDto): Promise<RelatorioPia> {
		const relatorioPia = await this.createRelatorioPia.execute(data);

		return relatorioPia;
	}
}
