import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { File } from './File';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey()
	_id!: string

	@Property()
	username!: string

	@Property()
	token!: string;

	@OneToMany(() => File, file => file.user)
	files = new Collection<File>(this);

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property()
	createdAt = new Date();

	@Property()
	uploadKey = crypto.randomBytes(20).toString('hex');

	constructor(id: string, username: string) {
		this._id = id;
		this.username = username;
		this.token = jwt.sign({ id, createdAt: this.createdAt}, process.env.SECRET);
	}

}