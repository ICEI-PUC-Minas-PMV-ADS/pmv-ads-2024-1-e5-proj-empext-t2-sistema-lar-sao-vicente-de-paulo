import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAntropometriaDto } from './create-antropometria.dto';

export class UpdateAntropometriaDto extends PartialType(
	OmitType(CreateAntropometriaDto, ['id_ficha_nutricional']),
) {}
