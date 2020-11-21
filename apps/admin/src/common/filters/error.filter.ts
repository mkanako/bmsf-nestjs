import { ExceptionFilter, BadRequestException, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { err } from '@common/utils/resHelper'
import { AuthException } from '../../auth'

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch (exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    const data = err(exception && exception.message)
    if (exception instanceof AuthException) {
      data.code = -1
    } else if (exception instanceof BadRequestException) {
      const error = exception.getResponse() as Record<string, any>
      if (typeof error === 'object' && error.message && Array.isArray(error.message)) {
        data.msg = error.message[0]
      }
    }
    response.status(HttpStatus.OK).json(data)
    console.log(exception)
  }
}
