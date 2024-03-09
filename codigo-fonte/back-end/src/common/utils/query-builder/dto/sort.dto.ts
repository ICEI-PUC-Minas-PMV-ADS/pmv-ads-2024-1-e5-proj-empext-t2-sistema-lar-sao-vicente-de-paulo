import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SortFields {
    @ApiProperty()
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
