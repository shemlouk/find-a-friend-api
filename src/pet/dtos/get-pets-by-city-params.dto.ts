import { MinLength } from 'class-validator';

export class GetPetsByCityParamsDto {
  @MinLength(2)
  city: string;
}
