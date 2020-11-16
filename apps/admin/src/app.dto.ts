import { IsNotEmpty, MinLength } from 'class-validator'
import { Match } from '@common/decorators/class-validator-match.decorator'

export class LoginDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}

export class ChangePasswordDto {
  @MinLength(6)
  password: string

  @Match('password')
  @MinLength(6)
  // eslint-disable-next-line camelcase
  password_confirmation: string
}
