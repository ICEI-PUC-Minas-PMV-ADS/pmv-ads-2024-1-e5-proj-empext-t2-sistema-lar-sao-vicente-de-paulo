import { azureConfig } from '@/config/blob-storage';
import {
	BlobServiceClient,
	BlobUploadCommonResponse,
	StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureBlobService {
	private blobServiceClient: BlobServiceClient;
	private containerClient;

	constructor() {
		const sharedKeyCredential = new StorageSharedKeyCredential(
			azureConfig.accountName, // Se necessário, adicione o nome da conta
			azureConfig.accountKey,
		);

		this.blobServiceClient = new BlobServiceClient(
			`https://${azureConfig.accountName}.blob.core.windows.net`,
			sharedKeyCredential,
		);

		this.containerClient = this.blobServiceClient.getContainerClient(
			azureConfig.containerName,
		);
	}

	async uploadBlob(fileBuffer: Buffer, blobName: string): Promise<string> {
		const blobClient = this.containerClient.getBlockBlobClient(blobName);
		await blobClient.upload(fileBuffer, fileBuffer.length);
		return blobClient.url;
	}

	async deleteBlob(blobName: string): Promise<void> {
		const blobClient = this.containerClient.getBlockBlobClient(blobName);
		await blobClient.delete();
	}
}
