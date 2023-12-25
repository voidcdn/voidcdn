import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { File } from './File';

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey()
	id!: string

	@Property()
	username: string

	@OneToMany({ entity: () => User, mappedBy: 'files' })
	files = new Collection<File>(this);

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property()
	createdAt = new Date();
}