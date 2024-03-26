import { Controller, Get, Param } from '@nestjs/common';
import { FindUidPermissaoService } from '../services/find-uid-permissao.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Permissao } from '../entities/permissao.entity';
import { AppResponse } from '@utils/app-response';

@Controller('permissoes')
@ApiTags('permissoes')
@ApiBearerAuth()
export class FindUidPermissaoController {
	constructor(private findUidPermissao: FindUidPermissaoService) {}

	@Get(':uid')
	@ApiOkResponse({
		type: Permissao,
	})
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<Permissao | null>> {
		const permissao = await this.findUidPermissao.execute(uid);

		return new AppResponse(permissao);
	}
}
