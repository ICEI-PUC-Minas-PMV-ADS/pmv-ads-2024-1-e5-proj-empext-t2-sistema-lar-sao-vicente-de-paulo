import { Module } from '@nestjs/common';
import { AzureBlobService } from './azure-blob/azure-blob-storage.service';

@Module({
	providers: [AzureBlobService],
	exports: [AzureBlobService],
})
export class UploadModule {}
