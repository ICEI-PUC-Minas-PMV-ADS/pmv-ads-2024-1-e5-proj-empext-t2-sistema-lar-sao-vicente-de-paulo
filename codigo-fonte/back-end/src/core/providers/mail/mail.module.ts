import { Module } from '@nestjs/common';
import { ResendService } from './resend/resend.service';
import { UmblerService } from './umbler/umbler.service';

@Module({
	providers: [ResendService, UmblerService],
	exports: [ResendService, UmblerService],
})
export class MailModule {}
