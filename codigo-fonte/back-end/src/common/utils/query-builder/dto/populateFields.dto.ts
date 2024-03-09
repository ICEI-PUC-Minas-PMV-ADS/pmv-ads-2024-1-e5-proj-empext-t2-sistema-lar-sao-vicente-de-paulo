import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FilterFields } from './filterFields.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PopulateFields {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    path: string;

    @ApiPropertyOptional()
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    primaryKey = 'id';

    @ApiPropertyOptional()
    @Expose()
    @IsString()
    @IsNotEmpty()
    select: string;

    @ApiPropertyOptional({
        type: 'object',
        isArray: true,
        description: 'repeat type field',
    })
    @Expose()
    @Type(() => PopulateFields)
    populate: PopulateFields[];

    @ApiPropertyOptional({
        type: FilterFields,
        isArray: true,
    })
    @Expose()
    @Type(() => FilterFields)
    filter: FilterFields[];
}
