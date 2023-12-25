import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FilesModule } from './files/files.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entitiesTs: ['./src/entities'],
			entities: ['./dist/entities'],
			type: 'postgresql',
			dbName: 'voidchan'
		}),
		FilesModule,
		UsersModule,
	],
	controllers: [AppController, UsersController],
	providers: [AppService],
})
export class AppModule {}
