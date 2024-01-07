import { PrismaService } from '@/prisma.service';
import { GetPetsByCity } from '@core/application/use-cases/get-pets-by-city';
import { RegisterPet } from '@core/application/use-cases/register-pet';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { PetRepository } from '@core/domain/repositories/pet-repository';
import { GetPetsByCityPresenter } from '@core/infra/presenters/get-pets-by-city-presenter';
import { RegisterPetPresenter } from '@core/infra/presenters/register-pet-presenter';
import { OrgPrismaRepository } from '@core/infra/repositories/prisma/org-prisma-repository';
import { PetPrismaRepository } from '@core/infra/repositories/prisma/pet-prisma-repository';
import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  controllers: [PetController],
  providers: [
    { provide: PrismaService, useClass: PrismaService },
    { provide: RegisterPetPresenter, useClass: RegisterPetPresenter },
    { provide: GetPetsByCityPresenter, useClass: GetPetsByCityPresenter },
    {
      provide: OrgPrismaRepository,
      useFactory: (prisma: PrismaService) => new OrgPrismaRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: PetPrismaRepository,
      useFactory: (prisma: PrismaService) => new PetPrismaRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: RegisterPet,
      useFactory: (
        petRepository: PetRepository,
        orgRepository: OrgRepository,
      ) => {
        return new RegisterPet(petRepository, orgRepository);
      },
      inject: [PetPrismaRepository, OrgPrismaRepository],
    },
    {
      provide: GetPetsByCity,
      useFactory: (
        petRepository: PetRepository,
        orgRepository: OrgRepository,
      ) => {
        return new GetPetsByCity(petRepository, orgRepository);
      },
      inject: [PetPrismaRepository, OrgPrismaRepository],
    },
    PetService,
  ],
})
export class PetModule {}
