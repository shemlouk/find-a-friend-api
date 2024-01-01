import { CepApi } from '@core/application/contracts/cep-api';
import { RegisterOrg } from '@core/application/use-cases/register-org';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { ViaCepApiAdapter } from '@core/infra/adapters/via-cep-api-adapter';
import { RegisterOrgPresenter } from '@core/infra/presenters/register-org-presenter';
import { OrgInMemoryRepository } from '@core/infra/repositories/in-memory/org-in-memory-repository';
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  controllers: [OrgController],
  providers: [
    OrgService,
    { provide: OrgInMemoryRepository, useClass: OrgInMemoryRepository },
    { provide: ViaCepApiAdapter, useClass: ViaCepApiAdapter },
    { provide: RegisterOrgPresenter, useClass: RegisterOrgPresenter },
    {
      provide: RegisterOrg,
      useFactory: (repo: OrgRepository, api: CepApi) => {
        return new RegisterOrg(repo, api);
      },
      inject: [OrgInMemoryRepository, ViaCepApiAdapter],
    },
  ],
})
export class OrgModule {}
