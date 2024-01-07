import { EnergyLevel, Size, SpaceRequirement } from '@core/domain/entities/pet';
import { IsEnum, IsOptional } from 'class-validator';

export class GetPetsByCityQueryDto {
  @IsOptional()
  @IsEnum(Size)
  size: Size;

  @IsOptional()
  @IsEnum(EnergyLevel)
  energyLevel: EnergyLevel;

  @IsOptional()
  @IsEnum(SpaceRequirement)
  spaceRequirement: SpaceRequirement;
}
