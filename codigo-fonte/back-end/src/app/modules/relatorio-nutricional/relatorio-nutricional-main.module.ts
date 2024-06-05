import { Module } from '@nestjs/common';
import { FichaNutricionalModule } from './ficha-nutricional/ficha-nutricional.module';

@Module({
	imports: [FichaNutricionalModule],
})
export class RelatorioNutricionalMainModule {}
