import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileMetadata } from './FileMetadata';
import { User } from './User';

@Entity({ tableName: 'files' })
export class File {
	@PrimaryKey()
	_id!: string;

	@OneToOne()
	metadata!: FileMetadata

	@Property({ type: 'bytea' })
	data!: Buffer

	@ManyToOne(() => User)
	user!: User
}
