import { Body, Controller, Post } from '@nestjs/common';
import { CreateIdosoService } from '../services/create-idoso.service';
import { CreateIdosoDto } from '../dtos/create-idoso.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';
import { AuthUser, IAuthUser } from '@/common/decorators/auth.decorator';
import { AppResponse } from '@utils/app-response';

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
	async handle(
		@AuthUser() user: IAuthUser,
		@Body() data: CreateIdosoDto,
	): Promise<AppResponse<{ uid: string; id: bigint }>> {
		const idoso = await this.createIdoso.execute(data, user.usuario.id);

		return new AppResponse({ uid: idoso.uid, id: idoso.id });
	}
}
