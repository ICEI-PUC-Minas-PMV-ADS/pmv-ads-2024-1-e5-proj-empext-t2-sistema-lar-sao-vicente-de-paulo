import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UploadFotoUsuarioDto } from '../dtos/upload-foto-usuario.dto';
import { AzureBlobService } from '@/core/providers/upload/azure-blob/azure-blob-storage.service';

@Injectable()
export class UploadFotoUsuarioService {
	constructor(
		private prisma: PrismaService,
		private blobService: AzureBlobService,
	) {}

	async execute(uid_usuario: string, data: UploadFotoUsuarioDto) {
		console.log(data.foto.path);
		if (data.foto) {
			const blobUrl = await this.blobService.uploadBlob(
				data.foto.buffer,
				data.foto.originalname,
				data.foto.mimetype,
			);

			await this.prisma.usuario.update({
				where: {
					uid: uid_usuario,
				},
				data: {
					foto: blobUrl,
				},
			});
		}

		return;
	}
}
