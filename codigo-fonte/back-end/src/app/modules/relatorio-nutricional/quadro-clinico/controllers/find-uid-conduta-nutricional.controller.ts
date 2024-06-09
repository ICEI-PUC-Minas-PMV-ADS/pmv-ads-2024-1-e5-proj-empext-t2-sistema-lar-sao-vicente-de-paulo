import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { QuadroClinico } from '@prisma/client';
import { FindUidQuadroClinicoService } from '../services/find-uid-quadro-clinico.service';

@ApiTags('quadro-clinico')
@Controller('quadro-clinico')
@ApiBearerAuth()
export class FindUidQuadroClinicoController {
	constructor(private findUidQuadroClinico: FindUidQuadroClinicoService) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Busca um Quadro Clínico pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Quadro Clínico a ser buscad',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<QuadroClinico | null> {
		const quadroClinico = await this.findUidQuadroClinico.execute(uid);

		return quadroClinico;
	}
}
