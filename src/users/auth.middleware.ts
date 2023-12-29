import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware, Next } from '@nestjs/common';
import { HTTP_NOT_AUTHORIZED, HTTP_USER_NOT_FOUND } from 'src/constants/Http';
import { UsersService } from 'src/users/users.service';
import fastify = require('fastify');
import { User } from 'src/entities/User';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(@Inject(UsersService) private readonly userService: UsersService) {}

	async use(req: fastify.FastifyRequest & { user?: User }, _res: fastify.FastifyReply, next: () => void) {
		const headers = req.headers.authorization;
		if (headers) {
			const user = await this.userService.findByKey(headers);
			if (!user) {
				throw new HttpException(HTTP_USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
			}

			req.user = user;
			next();
		} else {
			throw new HttpException(HTTP_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
		}
	}
}