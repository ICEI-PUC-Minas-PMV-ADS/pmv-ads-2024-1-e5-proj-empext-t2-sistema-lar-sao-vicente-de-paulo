import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCargoService } from '../services/delete-cargo.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargos')
@ApiTags('cargos')
export class DeleteCargoController {
	constructor(private deleteCargo: DeleteCargoService) {}

	@Delete(':uid')
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteCargo.execute(uid);

		return;
	}
}
