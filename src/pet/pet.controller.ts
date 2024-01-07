import { RegisterPetPresenter } from '@core/infra/presenters/register-pet-presenter';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPetDto } from './dtos/register-pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(
    private petService: PetService,
    private registerPetPresenter: RegisterPetPresenter,
  ) {}

  @Post()
  async register(@Body() registerPetDto: RegisterPetDto) {
    const { pet, org } = await this.petService.register(registerPetDto);
    return this.registerPetPresenter.http({ pet, org });
  }
}
