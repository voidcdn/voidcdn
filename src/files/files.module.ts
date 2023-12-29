import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { File } from 'src/entities/File';
import { AuthMiddleware } from 'src/users/auth.middleware';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/User';
import { FileMetadata } from 'src/entities/FileMetadata';

@Module({
	imports: [MikroOrmModule.forFeature({ entities: [File, User, FileMetadata] }), UsersModule],
	providers: [FilesService],
	controllers: [FilesController]
})
export class FilesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(
				{ path: 'files/upload', method: RequestMethod.POST })
	}
}
