import { Pet } from '@core/domain/entities/pet';
import {
  PetRepository,
  QueryFilter,
} from '@core/domain/repositories/pet-repository';

export class PetInMemoryRepository implements PetRepository {
  readonly pets: Pet[];

  async create(pet: Pet) {
    this.pets.push(pet);
    return pet;
  }

  async findManyByOrgId(orgId: string, query?: QueryFilter) {
    return this.pets.filter((pet) => {
      const hasSameId = pet.orgId === orgId;

      const queryValues = [
        query?.size,
        query?.energyLevel,
        query?.spaceRequirement,
      ];

      const queryResults = [];

      [pet.size, pet.energyLevel, pet.spaceRequirement].forEach(
        (value, index) => {
          queryResults.push(
            queryValues[index] ? value === queryValues[index] : true,
          );
        },
      );

      return hasSameId && queryResults.every((value) => value === true);
    });
  }

  async findById(petId: string) {
    return this.pets.find((pet) => pet.id === petId);
  }
}
