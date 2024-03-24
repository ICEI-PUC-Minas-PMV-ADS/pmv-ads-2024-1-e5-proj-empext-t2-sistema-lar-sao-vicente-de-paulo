import { QueryValidator } from '@/core/providers/query-builder/dto/queryValidator.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';

export const ApiQueryBuilder = () => {
    return applyDecorators(
        ApiExtraModels(QueryValidator),
        ApiQuery({
            type: QueryValidator,
        }),
    );
};
