import { ApplicationException } from './application-exception';

export class AddressNotFoundError extends ApplicationException {
  constructor(cep: string) {
    super('Could not find address with cep: ' + cep);
    this.name = 'AddressNotFoundError';
  }
}
