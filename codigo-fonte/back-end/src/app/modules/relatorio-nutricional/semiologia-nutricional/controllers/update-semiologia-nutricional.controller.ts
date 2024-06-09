import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { SemiologiaNutricional } from '@prisma/client';
import { UpdateSemiologiaNutricionalDto } from '../dtos/update-semiologia-nutricional.dto';
import { UpdateSemiologiaNutricionalService } from '../services/update-semiologia-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('semiologia-nutricional')
@Controller('semiologia-nutricional')
@ApiBearerAuth()
export class UpdateSemiologiaNutricionalController {
	constructor(
		private updateSemiologiaNutricional: UpdateSemiologiaNutricionalService,
	) {}

	@Patch(':uid')
	@Roles(RoleRelatorioNutricional.UPDATE)
	@ApiOperation({
		summary: 'Atualiza uma Semiologia Nutricional pelo UID',
	})
	@ApiBody({
		type: UpdateSemiologiaNutricionalDto,
		description: 'Dados da Semiologia Nutricional a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Semiologia Nutricional a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateSemiologiaNutricionalDto,
	): Promise<SemiologiaNutricional> {
		const semiologiaNutricional =
			await this.updateSemiologiaNutricional.execute(uid, data);

		return semiologiaNutricional;
	}
}
