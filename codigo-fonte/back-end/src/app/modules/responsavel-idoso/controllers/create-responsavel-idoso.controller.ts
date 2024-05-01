import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResponsavelIdosoService } from '../services/create-responsavel-idoso.service';
import { CreateResponsavelIdosoDto } from '../dtos/create-responsavel-idoso.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('idosos')
@Controller('responsaveis')
@ApiBearerAuth()
export class CreateResponsavelIdosoController {
	constructor(
		private createResponsavelIdoso: CreateResponsavelIdosoService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cadastrar o responsável do idoso' })
	@ApiBody({
		type: CreateResponsavelIdosoDto,
		isArray: true,
		description: 'Dados do responsável do idoso a ser criado',
	})
	@Roles(RoleIdoso.CREATE)
	@ApiResponseError()
	async handle(
		@Body() data: { responsaveis: CreateResponsavelIdosoDto[] },
	): Promise<void> {
		await this.createResponsavelIdoso.execute(data.responsaveis);
	}
}
