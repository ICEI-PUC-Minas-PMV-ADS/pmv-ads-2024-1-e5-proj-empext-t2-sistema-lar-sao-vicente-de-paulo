import { azureConfig } from '@/config/blob-storage';
import {
	BlobServiceClient,
	StorageSharedKeyCredential,
	ContainerClient,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureBlobService {
	private blobServiceClient: BlobServiceClient;
	private containerClient: ContainerClient;

	constructor() {
		const sharedKeyCredential = new StorageSharedKeyCredential(
			azureConfig.accountName,
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

	async uploadBlob(
		fileBuffer: Buffer,
		blobName: string,
		blobMimeType: string,
	): Promise<string> {
		const blobClient = this.containerClient.getBlockBlobClient(blobName);
		await blobClient.upload(fileBuffer, fileBuffer.length, {
			blobHTTPHeaders: { blobContentType: blobMimeType },
		});
		return blobClient.url;
	}

	async deleteBlob(blobName: string): Promise<void> {
		const blobClient = this.containerClient.getBlockBlobClient(blobName);
		await blobClient.delete();
	}
}
