import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
	model: TModel,
) => {
	return applyDecorators(
		ApiExtraModels(AppResponse),
		ApiExtraModels(model),
		ApiOkResponse({
			description: 'Lista de modelos recebida com sucesso',
			schema: {
				allOf: [
					{ $ref: getSchemaPath(AppResponse) },
					{
						properties: {
							data: {
								type: 'array',
								items: { $ref: getSchemaPath(model) },
							},
						},
					},
				],
			},
		}),
	);
};
