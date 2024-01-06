import { Pet } from '../entities/pet';

export interface PetRepository {
  create(pet: Pet): Promise<Pet>;
  findManyByOrgId(orgId: string): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | undefined>;
}
