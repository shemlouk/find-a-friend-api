import { RegisterOrgPresenter } from '@core/infra/presenters/register-org-presenter';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterOrgDto } from './dtos/register-org.dto';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
  constructor(
    private orgService: OrgService,
    private registerOrgPresenter: RegisterOrgPresenter,
  ) {}

  @Post()
  async register(@Body() registerOrgDto: RegisterOrgDto) {
    const data = await this.orgService.register(registerOrgDto);
    return this.registerOrgPresenter.http(data);
  }
}
