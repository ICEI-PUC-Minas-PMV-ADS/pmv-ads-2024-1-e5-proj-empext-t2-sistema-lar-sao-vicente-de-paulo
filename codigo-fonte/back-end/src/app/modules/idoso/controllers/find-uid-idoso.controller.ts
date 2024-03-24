import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { Idoso } from '../entities/idoso.entity';
import { FindUidIdosoService } from '../services/find-uid-idoso.service';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('idosos')
@Controller('idosos')
export class FindUidIdosoController {
	constructor(private findUidIdoso: FindUidIdosoService) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Retorna um idoso com base no seu UID' })
	@ApiParam({ name: 'uid', description: 'O UID do idoso a ser encontrado' })
	@ApiFindResponse(Idoso)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<Idoso | null>> {
		const idoso = await this.findUidIdoso.execute(uid);

		return new AppResponse(idoso);
	}
}
