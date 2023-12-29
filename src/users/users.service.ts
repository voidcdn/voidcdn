import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { HTTP_USER_ALREADY_EXISTS, HTTP_USER_NOT_FOUND } from 'src/constants/Http';
import { User } from 'src/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly repo: EntityRepository<User>,
		private readonly em: EntityManager,
	) {}

	async create(userData: User): Promise<User> {
		const user = await this.repo.count({ id: userData.id });
		if (user > 0) {
			throw new HttpException(HTTP_USER_ALREADY_EXISTS, HttpStatus.UNAUTHORIZED);
		}

		const data = new User(userData.id, userData.username);
		await this.em.persistAndFlush(data);

		return data;
	}

	async findByKey(key: string): Promise<User> {
		const user = await this.repo.findOne({ uploadKey: key });

		if (!user) {
			throw new HttpException(HTTP_USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
		}

		return user;
	}
}
