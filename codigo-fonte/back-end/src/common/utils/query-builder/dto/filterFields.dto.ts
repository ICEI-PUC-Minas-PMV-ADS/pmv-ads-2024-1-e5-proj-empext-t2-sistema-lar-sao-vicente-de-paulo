import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';

export class FilterFields {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    path: string;

    @ApiPropertyOptional({
        type: '',
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ValidateIf((obj) => !obj?.filter || obj?.value)
    value: any;

    @ApiPropertyOptional({
        enum: ['string', 'boolean', 'number', 'date'],
    })
    @Expose()
    @IsEnum(['string', 'boolean', 'number', 'date'])
    @IsOptional()
    type: 'string' | 'boolean' | 'number' | 'date';

    @ApiPropertyOptional()
    @Expose()
    @ValidateIf((obj) => obj?.insensitive)
    @IsOptional()
    insensitive: boolean;

    @ApiPropertyOptional({
        enum: [
            'contains',
            'endsWith',
            'startsWith',
            'equals',
            'gt',
            'gte',
            'in',
            'lt',
            'lte',
            'not',
            'notIn',
            'hasEvery',
            'hasSome',
            'has',
            'isEmpty',
        ],
    })
    @Expose()
    @IsEnum([
        'contains',
        'endsWith',
        'startsWith',
        'equals',
        'gt',
        'gte',
        'in',
        'lt',
        'lte',
        'not',
        'notIn',
        'hasEvery',
        'hasSome',
        'has',
        'isEmpty',
    ])
    @IsOptional()
    operator: typeOperator;

    @ApiPropertyOptional({
        enum: ['and', 'not', 'or'],
    })
    @Expose()
    @IsEnum(['and', 'not', 'or'])
    @IsOptional()
    filterGroup: 'and' | 'not' | 'or';

    @ApiPropertyOptional({
        type: 'object',
        isArray: true,
        description: 'repeat type field',
    })
    @Expose()
    @Type(() => FilterFields)
    filter: FilterFields[];

    @ApiPropertyOptional({
        enum: ['none', 'some', 'every'],
    })
    @Expose()
    @IsEnum(['none', 'some', 'every'])
    @IsOptional()
    filterInsideOperator: 'none' | 'some' | 'every';
}

type typeOperator =
    | 'contains'
    | 'endsWith'
    | 'startsWith'
    | 'equals'
    | 'gt'
    | 'gte'
    | 'in'
    | 'lt'
    | 'lte'
    | 'not'
    | 'notIn'
    | 'hasEvery'
    | 'hasSome'
    | 'has'
    | 'isEmpty';
