import {
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from '@/core/pipes/files-validation.pipe';
import { UploadFotoIdosoService } from '../services/upload-foto-idoso.service';
import { UploadFotoIdosoDto } from '../dtos/upload-foto-usuario.dto';

@ApiTags('idosos')
@Controller('idosos')
@ApiBearerAuth()
export class UploadFotoIdosoController {
	constructor(private uploadFotoIdoso: UploadFotoIdosoService) {}

	@Post(':uid/upload-foto')
	@ApiOperation({ summary: 'Fazer upload da foto do idoso' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: UploadFotoIdosoDto })
	@Roles(RoleIdoso.CREATE)
	@ApiResponseError()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }]))
	async handle(
		@Param('uid', ParseUUIDPipe) uid: string,
		@UploadedFiles(
			new FilesValidationPipe([
				{
					name: 'foto',
					maxCount: 1,
					maxSize: 1024 * 1024 * 5, // 5 MB
				},
			]),
		)
		files: {
			foto?: Express.Multer.File;
		},
	): Promise<void> {
		await this.uploadFotoIdoso.execute(uid, files);

		return;
	}
}
