import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRegistroAntropometricoDto } from './create-registro-antropometrico.dto';

export class UpdateRegistroAntropometricoDto extends PartialType(
	OmitType(CreateRegistroAntropometricoDto, ['id_ficha_nutricional']),
) {}
