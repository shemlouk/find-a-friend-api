import { PrismaService } from '@/prisma.service';
import { CepApi } from '@core/application/contracts/cep-api';
import { Jwt } from '@core/application/contracts/jwt';
import { AuthenticateOrg } from '@core/application/use-cases/authenticate-org';
import { RegisterOrg } from '@core/application/use-cases/register-org';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { JoseJwt } from '@core/infra/adapters/jose-jwt';
import { ViaCepApiAdapter } from '@core/infra/adapters/via-cep-api-adapter';
import { RegisterOrgPresenter } from '@core/infra/presenters/register-org-presenter';
import { OrgPrismaRepository } from '@core/infra/repositories/prisma/org-prisma-repository';
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  controllers: [OrgController],
  providers: [
    OrgService,
    { provide: RegisterOrgPresenter, useClass: RegisterOrgPresenter },
    { provide: ViaCepApiAdapter, useClass: ViaCepApiAdapter },
    { provide: PrismaService, useClass: PrismaService },
    { provide: JoseJwt, useClass: JoseJwt },
    {
      provide: RegisterOrg,
      useFactory: (orgRepository: OrgRepository, cepApi: CepApi) => {
        return new RegisterOrg(orgRepository, cepApi);
      },
      inject: [OrgPrismaRepository, ViaCepApiAdapter],
    },
    {
      provide: AuthenticateOrg,
      useFactory: (orgRepository: OrgRepository, jwt: Jwt<{ sub: string }>) => {
        return new AuthenticateOrg(orgRepository, jwt);
      },
      inject: [OrgPrismaRepository, JoseJwt],
    },
    {
      provide: OrgPrismaRepository,
      useFactory: (prisma: PrismaService) => new OrgPrismaRepository(prisma),
      inject: [PrismaService],
    },
  ],
})
export class OrgModule {}
