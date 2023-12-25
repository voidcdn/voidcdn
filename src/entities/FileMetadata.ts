import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity({ tableName: 'file_metadata' })
export class FileMetadata {
	@PrimaryKey()
	id!: string

	@Property()
	mimetype!: string

	@Property({ default: false })
	private!: boolean

	@Property()
	views!: number

	constructor() {
		this.views = 0;
	}
}