import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { MikroORM } from '@mikro-orm/core';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		MikroOrmModule.forRoot(),
		UsersModule,
		FilesModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements OnModuleInit, NestModule {
	constructor(private readonly orm: MikroORM) {}

	async onModuleInit(): Promise<void> {
		// const gen = this.orm.getSchemaGenerator();
		// await gen.createSchema();
		await this.orm.getMigrator().up();
	}

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(MikroOrmMiddleware)
			.forRoutes('*');
	}
}
