import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { FindUidResponsavelIdosoService } from '../services/find-uid-responsavel-idoso.service';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ResponsavelIdoso } from '../entities/responsavel-idoso.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { AppResponse } from '@utils/app-response';

@ApiTags('idosos')
@Controller('responsaveis')
@ApiBearerAuth()
export class FindUidResponsavelIdosoController {
	constructor(
		private findUidResponsavelIdoso: FindUidResponsavelIdosoService,
	) {}

	@Get(':uid')
	@ApiOperation({
		summary: 'Retorna um responsável do idoso com base no seu UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'O UID do responsável a ser encontrado',
	})
	@ApiFindResponse(ResponsavelIdoso)
	@Roles(RoleIdoso.FIND)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<ResponsavelIdoso | null>> {
		const responsavel = await this.findUidResponsavelIdoso.execute(uid);

		return new AppResponse(responsavel);
	}
}
