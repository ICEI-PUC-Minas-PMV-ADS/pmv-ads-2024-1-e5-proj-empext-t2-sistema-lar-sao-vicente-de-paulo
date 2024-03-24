import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCargoPermissaoService } from '../services/create-cargo-permissao.service';
import { CreateCargoPermissaoDto } from '../dtos/create-cargo-permissao-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
@ApiBearerAuth()
export class CreateCargoPermissaoController {
	constructor(private createCargoPermissao: CreateCargoPermissaoService) {}

	@Post()
	@Roles(RoleCargo.CREATE)
	@ApiResponseError()
	async handle(@Body() data: CreateCargoPermissaoDto): Promise<void> {
		await this.createCargoPermissao.execute(data);

		return;
	}
}
