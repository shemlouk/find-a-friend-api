import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthenticateDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(16)
  password: string;
}
