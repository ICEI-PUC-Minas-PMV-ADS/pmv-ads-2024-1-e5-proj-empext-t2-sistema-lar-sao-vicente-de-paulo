import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCargoPermissaoService } from '../services/update-cargo-permissao.service';
import { UpdateCargoPermissaoDto } from '../dtos/update-cargo-permissao-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
export class UpdateCargoPermissaoController {
	constructor(private updateCargoPermissao: UpdateCargoPermissaoService) {}

	@Put(':uid')
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateCargoPermissaoDto,
	): Promise<void> {
		await this.updateCargoPermissao.execute(uid, data);

		return;
	}
}
