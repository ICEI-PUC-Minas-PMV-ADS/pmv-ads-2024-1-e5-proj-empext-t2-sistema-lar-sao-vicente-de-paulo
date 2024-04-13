import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';

interface IMailMenssageDto {
	to: string;
	subject: string;
}

interface ISendText extends IMailMenssageDto {
	text: string;
}

@Injectable()
export class ResendService {
	private transporter: nodemailer.Transporter;

	constructor() {
		const config = {
			host: 'smtp.resend.com',
			secure: true,
			port: 465,
			auth: {
				user: 'resend',
				pass: process.env.RESEND_EMAIL_SPTM_KEY,
			},
		};
		this.transporter = nodemailer.createTransport(config);
	}

	async sendText({ subject, text, to }: ISendText) {
		try {
			await this.transporter.sendMail({
				from: 'Sistema de Acompanhamento de Idosos <onboarding@resend.dev>',
				to: to,
				subject: subject,
				text: text,
			});

			return;
		} catch (error) {
			throw new AppError(
				'Erro ao enviar o e-mail, tente novamente ou acione um técnico',
				400,
				error,
			);
		}
	}
}
