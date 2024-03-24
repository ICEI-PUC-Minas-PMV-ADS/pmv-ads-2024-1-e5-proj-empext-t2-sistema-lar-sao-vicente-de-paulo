import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SortFields {
    @ApiPropertyOptional({
        enum: ['asc', 'desc'],
    })
    @IsEnum(['asc', 'desc'])
    @IsOptional()
    @Expose()
    criteria: 'asc' | 'desc' = 'asc';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    field: string;
}
