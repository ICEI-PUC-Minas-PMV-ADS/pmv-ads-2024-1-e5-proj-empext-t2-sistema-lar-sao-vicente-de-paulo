import { Module } from '@nestjs/common';
import { FichaNutricionalModule } from './ficha-nutricional/ficha-nutricional.module';
import { SemiologiaNutricionalModule } from './semiologia-nutricional/semiologia-nutricional.module';
import { AntropometriaModule } from './antropometria/antropometria.module';

@Module({
	imports: [
		FichaNutricionalModule,
		SemiologiaNutricionalModule,
		AntropometriaModule,
	],
})
export class RelatorioNutricionalMainModule {}
