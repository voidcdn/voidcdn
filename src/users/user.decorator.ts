import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const BindUser = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest().raw;
	return !!data ? req.user[data] : req.user;
});