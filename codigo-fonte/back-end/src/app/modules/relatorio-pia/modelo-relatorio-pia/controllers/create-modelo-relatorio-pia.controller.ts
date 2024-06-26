import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateModeloRelatorioPiaService } from '../services/create-modelo-relatorio-pia.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateModeloRelatorioPiaDto } from '../dtos/create-modelo-relatorio-pia.dto';
import { ModeloRelatorioPia } from '../entities/modelo-relatorio-pia.entity';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class CreateModeloRelatorioPiaController {
	constructor(
		private createModeloRelatorioPia: CreateModeloRelatorioPiaService,
	) {}

	@Post()
	@Roles(RoleModeloRelatorioPia.CREATE)
	@ApiOperation({ summary: 'Cria um modelo de relatório de PIA' })
	@ApiBody({
		type: CreateModeloRelatorioPiaDto,
		description: 'Dados do modelo de relatório de PIA a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateModeloRelatorioPiaDto,
	): Promise<ModeloRelatorioPia> {
		const modeloRelatorioPia =
			await this.createModeloRelatorioPia.execute(data);

		return modeloRelatorioPia;
	}
}
