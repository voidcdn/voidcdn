import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileMetadata } from './FileMetadata';

@Entity({ tableName: 'files' })
export class File {
	@PrimaryKey()
	id!: string;

	@OneToOne()
	metadata: FileMetadata

	@Property({ type: 'bytea' })
	data!: Buffer
}
