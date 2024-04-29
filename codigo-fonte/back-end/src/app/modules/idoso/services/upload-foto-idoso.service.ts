import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { AzureBlobService } from '@/core/providers/upload/azure-blob/azure-blob-storage.service';
import { AppError } from '@utils/app-error';
import { UploadFotoIdosoDto } from '../dtos/upload-foto-usuario.dto';

@Injectable()
export class UploadFotoIdosoService {
	constructor(
		private prisma: PrismaService,
		private blobService: AzureBlobService,
	) {}

	async execute(uid_idoso: string, data: UploadFotoIdosoDto) {
		if (data.foto) {
			const idoso = await this.prisma.idoso.findUnique({
				where: { uid: uid_idoso },
			});

			if (!idoso) {
				throw new AppError('Nenhum idoso encontrado');
			}

			if (idoso.foto) {
				const nameBlob = idoso.foto.replace(
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

			await this.prisma.idoso.update({
				where: {
					uid: uid_idoso,
				},
				data: {
					foto: blobUrl,
				},
			});
		}

		return;
	}
}
