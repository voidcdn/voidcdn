import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'file_metadata' })
export class FileMetadata {
	@PrimaryKey()
	id!: string

	@Property()
	name!: string;

	@Property()
	mimetype!: string

	@Property()
	private!: boolean

	@Property()
	views!: number

	constructor() {
		this.views = 0;
	}
}