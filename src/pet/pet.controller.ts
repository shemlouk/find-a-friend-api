import { GetPetsByCityPresenter } from '@core/infra/presenters/get-pets-by-city-presenter';
import { RegisterPetPresenter } from '@core/infra/presenters/register-pet-presenter';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetPetsByCityParamsDto } from './dtos/get-pets-by-city-params.dto';
import { GetPetsByCityQueryDto } from './dtos/get-pets-by-city-query.dto';
import { RegisterPetDto } from './dtos/register-pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(
    private petService: PetService,
    private registerPetPresenter: RegisterPetPresenter,
    private getPetsByCityPresenter: GetPetsByCityPresenter,
  ) {}

  @Post()
  async register(@Body() registerPetDto: RegisterPetDto) {
    const { pet, org } = await this.petService.register(registerPetDto);
    return this.registerPetPresenter.http({ pet, org });
  }

  @Get('/search/:city')
  async searchByCity(
    @Param() params: GetPetsByCityParamsDto,
    @Query() query: GetPetsByCityQueryDto,
  ) {
    const result = await this.petService.searchByCity(params.city, query);
    return this.getPetsByCityPresenter.http(result);
  }
}
