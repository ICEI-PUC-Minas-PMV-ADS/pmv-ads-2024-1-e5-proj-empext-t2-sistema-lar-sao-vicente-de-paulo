import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteCargoPermissaoService } from '../services/delete-cargo-permissao.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
@ApiBearerAuth()
export class DeleteCargoPermissaoController {
	constructor(private deleteCargoPermissao: DeleteCargoPermissaoService) {}

	@Delete(':uid')
	@Roles(RoleCargo.DELETE)
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteCargoPermissao.execute(uid);

		return;
	}
}
