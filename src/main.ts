import { SetMetadata, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
