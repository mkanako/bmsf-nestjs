import { HttpException, HttpStatus } from '@nestjs/common'

export class AuthException extends HttpException {
  constructor (message = 'AuthException') {
    super(message, HttpStatus.OK)
  }
}
