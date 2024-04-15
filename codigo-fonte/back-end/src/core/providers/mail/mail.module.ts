import { Module } from '@nestjs/common';
import { ResendService } from './resend/resend.service';

@Module({
	providers: [ResendService],
	exports: [ResendService],
})
export class MailModule {}
