import { AppError } from '@/common/utils/app-error';
import {
	HttpException,
	ArgumentsHost,
	ExceptionFilter,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// type error custom generic all app
interface IResponseError {
	statusCode: number;
	message: string;
	detail: string[];
	timestamp: string;
	path: string;
}

export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		// handle error my context
		if (exception instanceof AppError) {
			const error: IResponseError = {
				statusCode: exception.statusCode,
				message: exception.message,
				detail: exception.detail || [],
				timestamp: new Date().toISOString(),
				path: request.url,
			};

			return response.status(exception.statusCode).json({
				error,
			});
		}

		// handle error http generic
		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const responseError: any = exception.getResponse();

			const error: IResponseError = {
				statusCode: exception.getStatus(),
				message: 'Erro na operação',
				detail:
					typeof responseError.message === 'string'
						? [responseError.message]
						: [...responseError.message],
				timestamp: new Date().toISOString(),
				path: request.url,
			};

			return response.status(status).json({
				error,
			});
		}

		// else, internal error
		this.logger.error(exception);

		console.log(exception);

		const error: IResponseError = {
			statusCode: 500,
			message: 'Ocorreu um erro no servidor',
			detail: ['Falha gerada no servidor'],
			timestamp: new Date().toISOString(),
			path: request.url,
		};

		return response.status(500).json({
			error,
		});
	}
}
