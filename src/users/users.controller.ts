import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { User } from 'src/entities/User';
import { UsersService } from './users.service';
import { FastifyReply } from 'fastify';
import { BindUser } from './user.decorator';

@Controller('users')
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Post('/create')
	async createUser(@Body() userData: User) {
		return await this.service.create(userData);
	}

	@Get('user')
	getUser(@BindUser() user: User, @Res() res: FastifyReply) {
		return res.send(user);
	}
}
