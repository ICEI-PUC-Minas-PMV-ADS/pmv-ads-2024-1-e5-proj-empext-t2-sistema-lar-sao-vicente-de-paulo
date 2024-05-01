import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFotoIdosoDto {
	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	foto?: Express.Multer.File;
}
