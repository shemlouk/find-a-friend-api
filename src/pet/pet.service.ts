import { GetPetsByCity } from '@core/application/use-cases/get-pets-by-city';
import { RegisterPet } from '@core/application/use-cases/register-pet';
import { Injectable } from '@nestjs/common';
import { GetPetsByCityQueryDto } from './dtos/get-pets-by-city-query.dto';
import { RegisterPetDto } from './dtos/register-pet.dto';

@Injectable()
export class PetService {
  constructor(
    private registerPet: RegisterPet,
    private getPetsByCity: GetPetsByCity,
  ) {}

  async register(body: RegisterPetDto) {
    const registeredPet = await this.registerPet.execute({
      ...body,
      photoUrl: 'http://google.com',
    });

    return registeredPet;
  }

  async searchByCity(city: string, query: GetPetsByCityQueryDto) {
    const searchResult = await this.getPetsByCity.execute({ city, query });
    return searchResult;
  }
}
