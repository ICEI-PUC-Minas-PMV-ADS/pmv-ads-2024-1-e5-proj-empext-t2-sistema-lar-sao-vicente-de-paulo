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

interface ISendHtml extends IMailMenssageDto {
	html: string;
}

@Injectable()
export class UmblerService {
	private transporter: nodemailer.Transporter;

	constructor() {
		const config = {
			host: 'smtp.umbler.com',
			secure: false,
			port: 587,
			auth: {
				user: 'contato@sailarsaovicente.site',
				pass: process.env.UMBLER_EMAIL_SPTM_KEY,
			},
		};
		this.transporter = nodemailer.createTransport(config);
	}

	async sendText({ subject, text, to }: ISendText) {
		try {
			await this.transporter.sendMail({
				from: 'Sistema de Acompanhamento de Idosos <contato@sailarsaovicente.site>',
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

	async sendHtml({ subject, html, to }: ISendHtml) {
		try {
			await this.transporter.sendMail({
				from: 'Sistema de Acompanhamento de Idosos <contato@sailarsaovicente.site>',
				to: to,
				subject: subject,
				html: html,
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
