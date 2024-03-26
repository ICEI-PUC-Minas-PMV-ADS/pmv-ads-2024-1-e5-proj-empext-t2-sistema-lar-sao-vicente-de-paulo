import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AppResponse<T = unknown> {
	@ApiPropertyOptional()
	public readonly page_number?: number;

	@ApiPropertyOptional()
	public readonly page_limit?: number;

	@ApiPropertyOptional()
	public readonly total_count?: number;

	@ApiProperty()
	public readonly data: T;

	constructor(
		data: T,
		pagination?: {
			page_number: number;
			page_limit: number;
			total_count: number;
		},
	) {
		this.page_number = pagination?.page_number;
		this.page_limit = pagination?.page_limit;
		this.total_count = pagination?.total_count;
		this.data = data || null;
	}
}
