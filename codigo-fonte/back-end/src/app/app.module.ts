import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { IdosoModule } from './modules/idoso/idoso.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsuarioModule,
        IdosoModule,
    ],
    providers: [],
})
export class AppModule { }
