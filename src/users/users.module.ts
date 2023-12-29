import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User';
import { AuthMiddleware } from './auth.middleware';

@Module({
	imports: [MikroOrmModule.forFeature([User])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(
				{ path: 'users/user', method: RequestMethod.GET })
	}
}
