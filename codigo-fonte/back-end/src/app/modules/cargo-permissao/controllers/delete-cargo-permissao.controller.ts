import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCargoPermissaoService } from '../services/delete-cargo-permissao.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
export class DeleteCargoPermissaoController {
	constructor(private deleteCargoPermissao: DeleteCargoPermissaoService) {}

	@Delete(':uid')
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteCargoPermissao.execute(uid);

		return;
	}
}
