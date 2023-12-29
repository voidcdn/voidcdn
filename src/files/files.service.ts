import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import fastify = require('fastify');
import { File } from 'src/entities/File';
import { FileMetadata } from 'src/entities/FileMetadata';
import { User } from 'src/entities/User';

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(File)
		private readonly repo: EntityRepository<File>,
		@InjectRepository(FileMetadata)
		private readonly metadataRepo: EntityRepository<FileMetadata>,
		@InjectRepository(User)
		private readonly usersRepo: EntityRepository<User>,
		private readonly em: EntityManager,
	) {}

	async upload(authKey: string, req: fastify.FastifyRequest, res: fastify.FastifyReply, uploadKey: string) {
		if (!req.isMultipart) {
			res.send(new BadRequestException(
				'Request is not multipart'
			));
			return
		}

		const user = await this.usersRepo.findOne({ uploadKey });
		const data = await req.file();
		const id = crypto.randomUUID();

		const file = new File();
		const metadata = new FileMetadata();

		metadata._id = id;
		metadata.mimetype = data.mimetype;
		metadata.private = false;
		metadata.views = 0;
		metadata.name = randomString(7, false);

		file._id = id;
		file.data = await data.toBuffer();
		file.user = user;
		file.metadata = metadata;

		user.files.add(file);

		await this.em.flush();
		console.log('test')

		res.send({ file: metadata.name });
		return;
	}

	async findOne(name: string, res: fastify.FastifyReply): Promise<Buffer> {
		const metadata = await this.metadataRepo.findOne({ name });
		if (!metadata) {
			res.send(new NotFoundException(
				'File not found.'
				));
				return
			}
			
			
		const file = await this.repo.findOne({ _id: metadata._id });
		metadata.views++

		this.em.flush();

		res.header('Content-Type', metadata.mimetype);
		return file.data;
	}
}

const randomString = (number: number, symbols: boolean) => {
	let text = '';
	let possible: string;
	if (!symbols) {
		possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	} else {
		possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_=+[]{}|;:/?><,.';
	}
	for (let i = 0; i < number; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};
