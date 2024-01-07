import { EnergyLevel, Pet, Size, SpaceRequirement } from '../entities/pet';

export interface PetRepository {
  create(pet: Pet): Promise<Pet>;
  findManyByOrgId(orgId: string, query?: QueryFilter): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | undefined>;
}

export type QueryFilter = Partial<{
  size: Size;
  energyLevel: EnergyLevel;
  spaceRequirement: SpaceRequirement;
}>;
