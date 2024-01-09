import { DomainException } from './domain-exception';

export class InvalidFormatError extends DomainException {
  constructor(...items: string[]) {
    super(`Invalid ${items.join(', ')}.`);
    this.name = 'InvalidFormatError';
  }
}
