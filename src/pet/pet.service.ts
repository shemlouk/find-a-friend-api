import { RegisterPet } from '@core/application/use-cases/register-pet';
import { Injectable } from '@nestjs/common';
import { RegisterPetDto } from './dtos/register-pet.dto';

@Injectable()
export class PetService {
  constructor(private registerPet: RegisterPet) {}

  async register(registerPetDto: RegisterPetDto) {
    const { pet, org } = await this.registerPet.execute(registerPetDto);
    return { pet, org };
  }
}
