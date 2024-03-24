import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindUidGrupoPermissaoService } from '../services/find-uid-grupo-permissao.service';
import { AppResponse } from '@utils/app-response';
import { GrupoPermissao } from '../entities/grupo-permissao.entity';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('grupo-permissoes')
@ApiTags('grupo-permissoes')
@ApiBearerAuth()
export class FindUidGrupoPermissaoController {
	constructor(private findUidGrupoPermissao: FindUidGrupoPermissaoService) {}

	@Get(':uid')
	@ApiOkResponse({
		type: GrupoPermissao,
	})
	@ApiFindResponse(GrupoPermissao)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<GrupoPermissao | null>> {
		const grupoPermissao = await this.findUidGrupoPermissao.execute(uid);

		return new AppResponse(grupoPermissao);
	}
}
