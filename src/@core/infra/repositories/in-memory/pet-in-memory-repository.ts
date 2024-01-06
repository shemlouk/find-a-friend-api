import { Pet } from '@core/domain/entities/pet';
import { PetRepository } from '@core/domain/repositories/pet-repository';

export class PetInMemoryRepository implements PetRepository {
  readonly pets: Pet[];

  async create(pet: Pet) {
    this.pets.push(pet);
    return pet;
  }

  async findManyByOrgId(orgId: string) {
    return this.pets.filter((pet) => pet.orgId === orgId);
  }

  async findById(petId: string) {
    return this.pets.find((pet) => pet.id === petId);
  }
}
