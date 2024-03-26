import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiFindResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiExtraModels(model),
		ApiOkResponse({
			description: 'Lista de modelos recebida com sucesso',
			schema: {
				allOf: [
					{
						properties: {
							data: {
								$ref: getSchemaPath(model),
							},
						},
					},
				],
			},
		}),
	);
};
