import { PrismaService } from '@/prisma.service';
import { CepApi } from '@core/application/contracts/cep-api';
import { RegisterOrg } from '@core/application/use-cases/register-org';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { ViaCepApiAdapter } from '@core/infra/adapters/via-cep-api-adapter';
import { RegisterOrgPresenter } from '@core/infra/presenters/register-org-presenter';
import { OrgInMemoryRepository } from '@core/infra/repositories/in-memory/org-in-memory-repository';
import { OrgPrismaRepository } from '@core/infra/repositories/prisma/org-prisma-repository';
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  controllers: [OrgController],
  providers: [
    OrgService,
    { provide: OrgInMemoryRepository, useClass: OrgInMemoryRepository },
    { provide: RegisterOrgPresenter, useClass: RegisterOrgPresenter },
    { provide: ViaCepApiAdapter, useClass: ViaCepApiAdapter },
    { provide: PrismaService, useClass: PrismaService },
    {
      provide: RegisterOrg,
      useFactory: (orgRepository: OrgRepository, cepApi: CepApi) => {
        return new RegisterOrg(orgRepository, cepApi);
      },
      inject: [OrgPrismaRepository, ViaCepApiAdapter],
    },
    {
      provide: OrgPrismaRepository,
      useFactory: (prisma: PrismaService) => new OrgPrismaRepository(prisma),
      inject: [PrismaService],
    },
  ],
})
export class OrgModule {}
