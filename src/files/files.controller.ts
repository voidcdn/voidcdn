import { Controller, Headers, Post, Req, Res, Get, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import fastify = require('fastify');
import { BindUser } from 'src/users/user.decorator';

@Controller('files')
export class FilesController {
	constructor(private readonly fileService: FilesService) {}

	// Endpoint that is accessed by ShareX (for now)
	@Post('/upload')
	async upload(@BindUser('uploadKey') uploadKey: string, @Headers('authorization') authKey: string, @Req() req: fastify.FastifyRequest, @Res() res: fastify.FastifyReply) {
		return this.fileService.upload(req, res, uploadKey);
	}

	@Get(':name')
	async findOne(@Param('name') name: string, @Res({ passthrough: true }) res: fastify.FastifyReply) {
		return this.fileService.findOne(name, res)
	}
}
