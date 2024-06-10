import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { SemiologiaNutricional } from '@prisma/client';
import { FindUidSemiologiaNutricionalService } from '../services/find-uid-semiologia-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('semiologia-nutricional')
@Controller('semiologia-nutricional')
@ApiBearerAuth()
export class FindUidSemiologiaNutricionalController {
	constructor(
		private findUidSemiologiaNutricional: FindUidSemiologiaNutricionalService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({ summary: 'Busca uma Semiologia Nutricional pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID da Semiologia Nutricional a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<SemiologiaNutricional | null> {
		const SemiologiaNutricional =
			await this.findUidSemiologiaNutricional.execute(uid);

		return SemiologiaNutricional;
	}
}
