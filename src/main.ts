import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

  app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.setGlobalPrefix('pormel/api/v1/');

	const PORT = AppModule.port || 3001;

	await app.listen(PORT, '0.0.0.0');
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();