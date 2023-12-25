import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { File } from 'src/entities/File';

@Module({
	imports: [MikroOrmModule.forFeature([File])],
	providers: [FilesService],
	controllers: [FilesController]
})
export class FilesModule {}
