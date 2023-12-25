import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entitiesTs: ['./src/entities'],
			entities: ['./dist/entities'],
			type: 'postgresql',
			dbName: 'voidchan'
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
