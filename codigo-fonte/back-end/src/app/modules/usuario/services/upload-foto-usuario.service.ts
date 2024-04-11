import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UploadFotoUsuarioDto } from '../dtos/upload-foto-usuario.dto';
import { AzureBlobService } from '@/core/providers/upload/azure-blob/azure-blob-storage.service';
import { AppError } from '@utils/app-error';

@Injectable()
export class UploadFotoUsuarioService {
	constructor(
		private prisma: PrismaService,
		private blobService: AzureBlobService,
	) {}

	async execute(uid_usuario: string, data: UploadFotoUsuarioDto) {
		if (data.foto) {
			const usuario = await this.prisma.usuario.findUnique({
				where: { uid: uid_usuario },
			});

			if (!usuario) {
				throw new AppError('Nenhum usuário encontrado');
			}

			if (usuario.foto) {
				const nameBlob = usuario.foto.replace(
					'https://dblardeidosos.blob.core.windows.net/arquivos/',
					'',
				);

				await this.blobService.deleteBlob(nameBlob);
			}

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
