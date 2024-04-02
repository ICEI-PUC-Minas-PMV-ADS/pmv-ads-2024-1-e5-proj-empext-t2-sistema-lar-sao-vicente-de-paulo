import { ApiProperty } from '@nestjs/swagger';

export class AppError {
	@ApiProperty()
	public message: string;

	@ApiProperty()
	public statusCode: number;

	@ApiProperty()
	public detail?: string[];

	@ApiProperty()
	public timetamps?: Date;

	@ApiProperty()
	public path?: string;

	constructor(message: string, statusCode = 400, detail?: string[]) {
		this.message = message;
		this.statusCode = statusCode;
		this.detail = detail;
		this.timetamps = new Date();
	}
}
