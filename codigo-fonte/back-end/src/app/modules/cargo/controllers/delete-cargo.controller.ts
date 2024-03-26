import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteCargoService } from '../services/delete-cargo.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargos')
@ApiTags('cargos')
@ApiBearerAuth()
export class DeleteCargoController {
	constructor(private deleteCargo: DeleteCargoService) {}

	@Delete(':uid')
	@Roles(RoleCargo.DELETE)
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteCargo.execute(uid);

		return;
	}
}
