import { Resend } from 'resend';

interface IMailMenssageDto {
	to: string;
	subject: string;
}

interface ISendText extends IMailMenssageDto {
	text: string;
}

export class ResendService {
	async sendText({ subject, text, to }: ISendText) {
		const resend = new Resend('re_YL6arK3W_FvfU259gHdGrvceS8WWPwMWS');

		const { data, error } = await resend.emails.send({
			from: 'Sistema de Acompanhamento de Idosos <onboarding@resend.dev>',
			to: to,
			subject: subject,
			html: text,
		});

		if (error) {
			return console.error({ error });
		}

		console.log({ data });
	}
}
