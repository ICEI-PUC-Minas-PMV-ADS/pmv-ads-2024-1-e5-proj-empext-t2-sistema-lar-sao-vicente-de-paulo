import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { UpdateResponsavelIdosoService } from '../services/update-responsavel-idoso.service';
import { UpdateResponsavelIdosoDto } from '../dtos/update-responsavel-idoso.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';

@ApiTags('idosos/responsaveis')
@Controller('idosos/responsaveis')
@ApiBearerAuth()
export class UpdateResponsavelIdosoController {
	constructor(
		private updateResponsavelIdoso: UpdateResponsavelIdosoService,
	) {}

	@Patch(':uid')
	@ApiOperation({
		summary:
			'Atualiza os dados de um responsável com base no UID fornecido',
	})
	@ApiParam({
		name: 'uid',
		description: 'O UID do responsável a ser atualizado',
	})
	@Roles(RoleIdoso.UPDATE)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateResponsavelIdosoDto,
	): Promise<void> {
		await this.updateResponsavelIdoso.execute(uid, data);

		return;
	}
}
