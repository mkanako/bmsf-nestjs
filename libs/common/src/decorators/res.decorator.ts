import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Res = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getResponse()
})
