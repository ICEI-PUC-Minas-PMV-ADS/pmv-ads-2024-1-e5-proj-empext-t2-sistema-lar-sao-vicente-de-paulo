import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidFichaNutricionalService } from '../services/find-uid-ficha-nutricional.service';
import { FichaNutricional } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('ficha-nutricional')
@Controller('ficha-nutricional')
@ApiBearerAuth()
export class FindUidFichaNutricionalController {
	constructor(
		private findUidFichaNutricional: FindUidFichaNutricionalService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({ summary: 'Busca uma Ficha Nutricional pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID da Ficha Nutricional a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<FichaNutricional | null> {
		const fichaNutricional =
			await this.findUidFichaNutricional.execute(uid);

		return fichaNutricional;
	}
}
