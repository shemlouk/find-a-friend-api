import {
  IsEmail,
  IsNumberString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterOrgDto {
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Length(8)
  @IsNumberString()
  cep: string;

  @MinLength(9)
  @MaxLength(13)
  @IsNumberString()
  phone: string;
}
