import { applyDecorators } from '@nestjs/common';
import {
    ApiDefaultResponse,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';
import { AppError } from '@utils/app-error';

export const ApiResponseError = () => {
    return applyDecorators(
        ApiExtraModels(AppError),
        ApiDefaultResponse({
            schema: {
                properties: {
                    error: {
                        $ref: getSchemaPath(AppError),
                    },
                },
            },
        }),
    );
};
