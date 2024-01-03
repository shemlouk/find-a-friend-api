import { ApplicationException } from './application-exception';

export class InvalidCredentialsError extends ApplicationException {
  constructor() {
    super('Could not authenticate with invalid credentials.');
    this.name = 'InvalidCredentialsError';
  }
}
