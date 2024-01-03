import { AuthenticateOrg } from '@core/application/use-cases/authenticate-org';
import { RegisterOrg } from '@core/application/use-cases/register-org';
import { Injectable } from '@nestjs/common';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { RegisterOrgDto } from './dtos/register-org.dto';

@Injectable()
export class OrgService {
  constructor(
    private registerOrg: RegisterOrg,
    private authenticateOrg: AuthenticateOrg,
  ) {}

  async register(registerOrgDto: RegisterOrgDto) {
    const { org } = await this.registerOrg.execute(registerOrgDto);
    return { org };
  }

  async authenticate(authenticateDto: AuthenticateDto) {
    const { token } = await this.authenticateOrg.execute(authenticateDto);
    return { token };
  }
}
