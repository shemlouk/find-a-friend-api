import { PetEnums } from '@core/domain/entities/pet';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import {
  PetRepository,
  QueryFilter,
} from '@core/domain/repositories/pet-repository';

export class GetPetsByCity {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute(input: InputBoundary): Promise<OutputBoundary> {
    const orgs = await this.orgRepository.findManyByCity(input.city);

    const petsByOrg: PetsByOrg = [];

    for (const org of orgs) {
      const pets = await this.petRepository.findManyByOrgId(
        org.id,
        input.query,
      );

      petsByOrg.push({
        ...org.toObject(),
        pets: pets.map((pet) => pet.toObject()),
      });
    }

    return { petsByOrg };
  }
}

interface InputBoundary {
  city: string;
  query: QueryFilter;
}

export interface OutputBoundary {
  petsByOrg: PetsByOrg;
}

type PetsByOrg = {
  id: string;
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    cep: string;
    city: string;
    completeAddress: string;
  };
  pets: {
    orgId: string;
    name: string;
    description: string;
    age: PetEnums.Age;
    size: PetEnums.Size;
    category: PetEnums.Category;
    energyLevel: PetEnums.EnergyLevel;
    independencyLevel: PetEnums.IndependencyLevel;
    spaceRequirement: PetEnums.SpaceRequirement;
    adoptionRequirements: string[];
    photoUrl: string;
    isAdopted: boolean;
  }[];
}[];
