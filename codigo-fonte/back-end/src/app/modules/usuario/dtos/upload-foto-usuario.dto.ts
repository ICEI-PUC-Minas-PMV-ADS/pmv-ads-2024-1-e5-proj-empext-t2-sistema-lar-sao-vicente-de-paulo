import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFotoUsuarioDto {
	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	foto?: Express.Multer.File;
}
