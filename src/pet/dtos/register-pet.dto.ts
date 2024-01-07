import { PetEnums } from '@core/domain/entities/pet';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterPetDto {
  @IsUUID()
  orgId: string;

  @MinLength(2)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(PetEnums.Age)
  age: PetEnums.Age;

  @IsEnum(PetEnums.Size)
  size: PetEnums.Size;

  @IsEnum(PetEnums.Category)
  category: PetEnums.Category;

  @IsEnum(PetEnums.EnergyLevel)
  energyLevel: PetEnums.EnergyLevel;

  @IsEnum(PetEnums.IndependencyLevel)
  independencyLevel: PetEnums.IndependencyLevel;

  @IsEnum(PetEnums.SpaceRequirement)
  spaceRequirement: PetEnums.SpaceRequirement;

  @IsArray()
  @IsString({ each: true })
  adoptionRequirements: string[];
}
