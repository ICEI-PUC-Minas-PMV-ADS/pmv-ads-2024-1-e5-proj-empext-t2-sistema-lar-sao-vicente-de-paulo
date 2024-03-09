export class AppError {
    public message: string;

    public statusCode: number;

    public detail?: string[];

    public timetamps?: Date;

    constructor(message: string, statusCode = 400, detail?: string[]) {
        this.message = message;
        this.statusCode = statusCode;
        this.detail = detail;
        this.timetamps = new Date();
    }
}
