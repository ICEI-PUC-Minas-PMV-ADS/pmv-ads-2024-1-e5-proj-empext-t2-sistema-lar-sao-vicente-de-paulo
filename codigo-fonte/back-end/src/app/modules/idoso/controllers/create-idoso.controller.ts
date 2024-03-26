import { Body, Controller, Post } from '@nestjs/common';
import { CreateIdosoService } from '../services/create-idoso.service';
import { CreateIdosoDto } from '../dtos/create-idoso.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('idosos')
@Controller('idosos')
@ApiBearerAuth()
export class CreateIdosoController {
	constructor(private createIdoso: CreateIdosoService) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra um novo idoso' })
	@ApiBody({
		type: CreateIdosoDto,
		description: 'Dados do novo idoso a ser criado',
	})
	@Roles(RoleIdoso.CREATE)
	@ApiResponseError()
	async handle(@Body() data: CreateIdosoDto): Promise<void> {
		await this.createIdoso.execute(data);
	}
}
