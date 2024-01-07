import { EnergyLevel, Size, SpaceRequirement } from '@core/domain/entities/pet';
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

  @IsEnum(Size)
  size: Size;

  @IsEnum(EnergyLevel)
  energyLevel: EnergyLevel;

  @IsEnum(SpaceRequirement)
  spaceRequirement: SpaceRequirement;

  @IsArray()
  @IsString({ each: true })
  adoptionRequirements: string[];
}
