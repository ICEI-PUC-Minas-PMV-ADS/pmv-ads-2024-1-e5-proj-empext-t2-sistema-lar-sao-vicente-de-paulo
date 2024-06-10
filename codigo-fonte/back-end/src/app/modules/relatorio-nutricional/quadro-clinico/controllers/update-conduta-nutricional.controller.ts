import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { QuadroClinico } from '@prisma/client';
import { UpdateQuadroClinicoDto } from '../dtos/update-quadro-clinico.dto';
import { UpdateQuadroClinicoService } from '../services/update-quadro-clinico.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('quadro-clinico')
@Controller('quadro-clinico')
@ApiBearerAuth()
export class UpdateQuadroClinicoController {
	constructor(private updateQuadroClinico: UpdateQuadroClinicoService) {}

	@Patch(':uid')
	@Roles(RoleRelatorioNutricional.UPDATE)
	@ApiOperation({
		summary: 'Atualiza um Quadro Clínico pelo UID',
	})
	@ApiBody({
		type: UpdateQuadroClinicoDto,
		description: 'Dados do Quadro Clínico a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Quadro Clínico a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateQuadroClinicoDto,
	): Promise<QuadroClinico> {
		const quadroClinico = await this.updateQuadroClinico.execute(uid, data);

		return quadroClinico;
	}
}
