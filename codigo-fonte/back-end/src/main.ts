import './patch';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API - Sistema Lar São Vicente de Paulo')
        .setDescription('Documentação das rotas e tipagem')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api-doc', app, document, {
        swaggerOptions: {
            docExpansion: 'none',
        },
    });

    await app.listen(Number(process.env.SERVER_PORT) || 3030, () => {
        const logger = new Logger('Server');

        logger.log('Is running: ' + (process.env.SERVER_PORT || 3030));
    });
}
bootstrap();
