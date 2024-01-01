import { RegisterOrg } from '@core/application/use-cases/register-org';
import { Injectable } from '@nestjs/common';
import { RegisterOrgDto } from './dtos/register-org.dto';

@Injectable()
export class OrgService {
  constructor(private registerOrg: RegisterOrg) {}

  async register(registerOrgDto: RegisterOrgDto) {
    return this.registerOrg.execute(registerOrgDto);
  }
}
