import {
  EnergyLevel,
  Pet,
  Size,
  SpaceRequirement,
} from '@core/domain/entities/pet';
import {
  PetRepository,
  QueryFilter,
} from '@core/domain/repositories/pet-repository';
import { UniqueID } from '@core/domain/value-objects/unique-id';
import { PrismaClient } from '@prisma/client';
import { Pet as PrismaPet } from 'prisma/prisma-client';

export class PetPrismaRepository implements PetRepository {
  constructor(private prisma: PrismaClient) {}

  async create(pet: Pet) {
    const { adoptionRequirements, ...restOfPetData } = pet.toObject();

    await this.prisma.pet.create({
      data: {
        ...restOfPetData,
        adoptionRequirements: adoptionRequirements.join(', '),
      },
    });

    return pet;
  }

  async findById(petId: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    return pet && createPet(pet);
  }

  async findManyByOrgId(orgId: string, queryFilter?: QueryFilter) {
    const pets = await this.prisma.pet.findMany({
      where: { orgId, ...queryFilter },
    });
    return pets.map((pet) => createPet(pet));
  }
}

function createPet(pet: PrismaPet) {
  return new Pet(
    {
      ...pet,
      orgId: new UniqueID(pet.orgId),
      size: pet.size as Size,
      energyLevel: pet.energyLevel as EnergyLevel,
      spaceRequirement: pet.spaceRequirement as SpaceRequirement,
      adoptionRequirements: pet.adoptionRequirements.split(', '),
    },
    pet.id,
  );
}
