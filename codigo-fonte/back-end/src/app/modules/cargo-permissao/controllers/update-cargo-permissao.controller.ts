import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCargoPermissaoService } from '../services/update-cargo-permissao.service';
import { UpdateCargoPermissaoDto } from '../dtos/update-cargo-permissao-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
@ApiBearerAuth()
export class UpdateCargoPermissaoController {
	constructor(private updateCargoPermissao: UpdateCargoPermissaoService) {}

	@Patch(':uid')
	@Roles(RoleCargo.UPDATE)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateCargoPermissaoDto,
	): Promise<void> {
		await this.updateCargoPermissao.execute(uid, data);

		return;
	}
}
