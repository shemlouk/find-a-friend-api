import { Pet, PetEnums } from '../entities/pet';

export interface PetRepository {
  create(pet: Pet): Promise<Pet>;
  findManyByOrgId(orgId: string, query?: QueryFilter): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | undefined>;
}

export type QueryFilter = Partial<{
  age: PetEnums.Age;
  size: PetEnums.Size;
  category: PetEnums.Category;
  energyLevel: PetEnums.EnergyLevel;
  independencyLevel: PetEnums.IndependencyLevel;
  spaceRequirement: PetEnums.SpaceRequirement;
}>;
