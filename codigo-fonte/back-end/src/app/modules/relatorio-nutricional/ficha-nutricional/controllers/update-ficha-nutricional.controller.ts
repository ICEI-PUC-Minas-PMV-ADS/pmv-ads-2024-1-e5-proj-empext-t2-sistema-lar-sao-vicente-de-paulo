import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateFichaNutricionalDto } from '../dtos/update-ficha-nutricional';
import { UpdateFichaNutricionalService } from '../services/update-ficha-nutricional.service';
import { FichaNutricional } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('ficha-nutricional')
@Controller('ficha-nutricional')
@ApiBearerAuth()
export class UpdateFichaNutricionalController {
	constructor(
		private updateFichaNutricional: UpdateFichaNutricionalService,
	) {}

	@Patch(':uid')
	@Roles(RoleRelatorioNutricional.UPDATE)
	@ApiOperation({
		summary: 'Atualiza uma Ficha Nutricional pelo UID',
	})
	@ApiBody({
		type: UpdateFichaNutricionalDto,
		description: 'Dados da Ficha Nutricional a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Ficha Nutricional a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateFichaNutricionalDto,
	): Promise<FichaNutricional> {
		const fichaNutricional = await this.updateFichaNutricional.execute(
			uid,
			data,
		);

		return fichaNutricional;
	}
}
