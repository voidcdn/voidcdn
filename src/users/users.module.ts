import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User';

@Module({
	imports: [MikroOrmModule.forFeature([User])],
	providers: [UsersService],
	controllers: [UsersController]
})
export class UsersModule {}
