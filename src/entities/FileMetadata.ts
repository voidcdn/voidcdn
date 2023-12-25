import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

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

	@Property()
	userId!: string

	constructor() {
		this.views = 0;
	}
}