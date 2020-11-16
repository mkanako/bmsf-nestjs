import { IsNotEmpty, IsDefined, IsString } from 'class-validator'

export class LoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string
}
