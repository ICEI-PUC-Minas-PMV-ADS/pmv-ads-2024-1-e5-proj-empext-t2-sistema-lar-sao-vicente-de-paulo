import { Module } from '@nestjs/common';
import { FichaNutricionalModule } from './ficha-nutricional/ficha-nutricional.module';
import { SemiologiaNutricionalModule } from './semiologia-nutricional/semiologia-nutricional.module';
import { AntropometriaModule } from './antropometria/antropometria.module';
import { NecessidadeNutricionalModule } from './necessidade-nutricional/necessidade-nutricional.module';
import { CondutaNutricionalModule } from './conduta-nutricional/conduta-nutricional.module';

@Module({
	imports: [
		FichaNutricionalModule,
		SemiologiaNutricionalModule,
		AntropometriaModule,
		NecessidadeNutricionalModule,
		CondutaNutricionalModule,
	],
})
export class RelatorioNutricionalMainModule {}
