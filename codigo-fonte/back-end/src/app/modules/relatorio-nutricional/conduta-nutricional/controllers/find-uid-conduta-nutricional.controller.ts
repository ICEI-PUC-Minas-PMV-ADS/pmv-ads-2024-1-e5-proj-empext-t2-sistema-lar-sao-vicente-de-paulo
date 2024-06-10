import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CondutaNutricional } from '@prisma/client';
import { FindUidCondutaNutricionalService } from '../services/find-uid-conduta-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('conduta-nutricional')
@Controller('conduta-nutricional')
@ApiBearerAuth()
export class FindUidCondutaNutricionalController {
	constructor(
		private findUidCondutaNutricional: FindUidCondutaNutricionalService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({ summary: 'Busca uma Conduta Nutricional pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID da Conduta Nutricional a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<CondutaNutricional | null> {
		const condutaNutricional =
			await this.findUidCondutaNutricional.execute(uid);

		return condutaNutricional;
	}
}
