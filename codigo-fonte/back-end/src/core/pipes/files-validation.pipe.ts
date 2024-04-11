import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AppError } from '@utils/app-error';

interface IFile {
    name: string;
    maxSize?: number;
    fileType?: string | RegExp;
    maxCount?: number;
    isArray?: boolean;
}

interface IValue {
    [x: string]: Express.Multer.File[];
}

@Injectable()
export class FilesValidationPipe implements PipeTransform {
    private files: IFile[];

    constructor(files: IFile[]) {
        this.files = files;
    }

    transform(value: IValue, _metadata: ArgumentMetadata) {
        const keysValues = Object.keys(value);

        const values: object = {};

        for (const fileName of keysValues) {
            const file = this.files.find((v) => v.name === fileName);
            const valueFile = value[fileName];

            /* verifica se o mesmo arquivo que esta no value está nas configuracoes */
            if (!file || !valueFile)
                throw new AppError('Arquivos inválidos', 400);

            /* valida se o arquivo contem a quantidade limite */
            if (file?.maxCount && valueFile.length > file.maxCount)
                throw new AppError('Limite de arquivos ultrapassado', 400, [
                    `${file.name} is max length ${file.maxCount}`,
                ]);

            /* verifica se o arquivo tem o tamanho configurado */
            if (file?.maxSize) {
                for (let i = 0; i < valueFile.length; i++) {
                    const f = valueFile[i];

                    if (file?.maxSize && f.size > file.maxSize) {
                        throw new AppError(
                            'Tamanho máximo do arquivo ultrapassado',
                            400,
                            [`${file.name} is max size ${file.maxSize}`],
                        );
                    }
                }
            }

            /* valida o tipo do arquivo */
            if (file.fileType) {
                for (let i = 0; i < valueFile.length; i++) {
                    const f = valueFile[i];

                    const match = f.mimetype.match(file.fileType);

                    if (!match)
                        throw new AppError('Tipo de arquivo inválido', 400, [
                            `${file.name} is mimetype supported ${file.fileType}`,
                        ]);
                }
            }

            if (!file.isArray) {
                values[fileName] = valueFile[0];
            } else {
                values[fileName] = valueFile;
            }
        }

        return values;
    }
}
