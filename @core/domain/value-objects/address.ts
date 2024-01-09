import { InvalidFormatError } from '@core/domain/errors/invalid-format';

export class Address {
  readonly completeAddress: string;
  readonly city: string;
  readonly cep: string;

  static cepRegex = /^\d{8}$/;

  constructor(cep: string, city: string, completeAddress: string) {
    const isCepValid = Address.cepRegex.test(cep);
    if (!isCepValid) throw new InvalidFormatError('Cep');

    this.completeAddress = completeAddress;
    this.city = city;
    this.cep = cep;
  }
}
