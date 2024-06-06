import { Module } from '@nestjs/common';
import { FichaNutricionalModule } from './ficha-nutricional/ficha-nutricional.module';
import { SemiologiaNutricionalModule } from './semiologia-nutricional/semiologia-nutricional.module';

@Module({
	imports: [FichaNutricionalModule, SemiologiaNutricionalModule],
})
export class RelatorioNutricionalMainModule {}
