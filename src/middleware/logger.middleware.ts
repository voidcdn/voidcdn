import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import fastify = require('fastify');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	async use(req: fastify.FastifyRequest, res: fastify.FastifyReply, next: () => void) {
		const { method, ip, id, originalUrl } = req;
		this.logger.log(`(ID: ${id}) ${method} ${originalUrl} ${res.statusCode} -> ${ip} ${req.headers['user-agent'] ?? ''}`);
		next();
	}
}