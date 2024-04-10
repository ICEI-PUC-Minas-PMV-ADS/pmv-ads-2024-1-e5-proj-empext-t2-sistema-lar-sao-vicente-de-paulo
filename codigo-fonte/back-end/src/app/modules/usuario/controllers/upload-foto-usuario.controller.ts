import {
	Controller,
	ParseUUIDPipe,
	Post,
	Query,
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
import { RoleUsuario } from '@/common/enums/roles';
import { UploadFotoUsuarioService } from '../services/upload-foto-usuario.service';
import { UploadFotoUsuarioDto } from '../dtos/upload-foto-usuario.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from '@/core/pipes/files-validation.pipe';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class UploadFotoUsuarioController {
	constructor(private uploadFotoUsuario: UploadFotoUsuarioService) {}

	@Post('upload-foto')
	@ApiOperation({ summary: 'Fazer upload da foto do usuário' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: UploadFotoUsuarioDto })
	@Roles(RoleUsuario.CREATE)
	@ApiResponseError()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }]))
	async handle(
		@Query('uid_usuario', ParseUUIDPipe) uid_usuario: string,
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
		await this.uploadFotoUsuario.execute(uid_usuario, files);

		return;
	}
}
