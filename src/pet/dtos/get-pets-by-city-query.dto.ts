import { PetEnums } from '@core/domain/entities/pet';
import { IsEnum, IsOptional } from 'class-validator';

export class GetPetsByCityQueryDto {
  @IsOptional()
  @IsEnum(PetEnums.Age)
  age: PetEnums.Age;

  @IsOptional()
  @IsEnum(PetEnums.Size)
  size: PetEnums.Size;

  @IsOptional()
  @IsEnum(PetEnums.Category)
  category: PetEnums.Category;

  @IsOptional()
  @IsEnum(PetEnums.EnergyLevel)
  energyLevel: PetEnums.EnergyLevel;

  @IsOptional()
  @IsEnum(PetEnums.IndependencyLevel)
  independencyLevel: PetEnums.IndependencyLevel;

  @IsOptional()
  @IsEnum(PetEnums.SpaceRequirement)
  spaceRequirement: PetEnums.SpaceRequirement;
}
