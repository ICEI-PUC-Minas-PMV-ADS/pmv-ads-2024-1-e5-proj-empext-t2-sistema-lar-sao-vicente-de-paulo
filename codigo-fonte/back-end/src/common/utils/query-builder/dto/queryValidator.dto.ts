import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { FilterFields } from './filterFields.dto';
import { PopulateFields } from './populateFields.dto';
import { SortFields } from './sort.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryValidator {
    @ApiPropertyOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @Expose()
    page_number: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @Expose()
    page_limit: number;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Expose()
    select: string;

    @ApiPropertyOptional({
        type: PopulateFields,
        isArray: true,
    })
    @Expose()
    @Type(() => PopulateFields)
    @ValidateNested({ each: true })
    populate: PopulateFields[];

    @ApiPropertyOptional({
        type: FilterFields,
        isArray: true,
    })
    @Expose()
    @Type(() => FilterFields)
    @ValidateNested({ each: true })
    filter: FilterFields[];

    @ApiPropertyOptional({
        type: SortFields,
    })
    @Expose()
    @Type(() => SortFields)
    @ValidateNested({ each: true })
    sort: SortFields;
}
