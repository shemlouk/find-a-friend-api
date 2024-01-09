import { Pet, PetEnums } from '@core/domain/entities/pet';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { PetRepository } from '@core/domain/repositories/pet-repository';
import { UniqueID } from '@core/domain/value-objects/unique-id';
import { NotFoundError } from '../errors/not-found-error';

export class RegisterPet {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute(input: InputBoundary): Promise<OutputBoundary> {
    const org = await this.orgRepository.findById(input.orgId);
    if (!org) throw new NotFoundError('Org');

    const pet = new Pet({
      ...input,
      orgId: new UniqueID(org.id),
      isAdopted: false,
    });

    await this.petRepository.create(pet);

    return Object.freeze({
      pet: pet.toObject(),
      org: org.toObject(),
    });
  }
}

interface InputBoundary {
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
}

export interface OutputBoundary {
  pet: {
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
  };
  org: {
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
  };
}
