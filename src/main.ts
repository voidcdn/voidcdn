import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import multipart = require('@fastify/multipart');
async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			bodyLimit: 100 * 1024 * 1024, // set to 100mb max file size
		})
	);

	console.log(process.env.POSTGRES_PASSWORD)
	app.register(multipart)
	await app.listen(3000);
}

bootstrap();