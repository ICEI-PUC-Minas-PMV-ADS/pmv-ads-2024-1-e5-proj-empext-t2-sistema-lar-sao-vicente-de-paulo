import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCargoPermissaoService } from '../services/create-cargo-permissao.service';
import { CreateCargoPermissaoDto } from '../dtos/create-cargo-permissao-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
export class CreateCargoPermissaoController {
	constructor(private createCargoPermissao: CreateCargoPermissaoService) {}

	@Post()
	@ApiResponseError()
	async handle(@Body() data: CreateCargoPermissaoDto): Promise<void> {
		await this.createCargoPermissao.execute(data);

		return;
	}
}
