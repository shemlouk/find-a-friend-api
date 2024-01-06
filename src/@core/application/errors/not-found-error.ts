import { ApplicationException } from './application-exception';

export class NotFoundError extends ApplicationException {
  constructor(item: string) {
    super(`${item.charAt(0).toUpperCase() + item.slice(1)} not found.`);
    this.name = 'NotFoundError';
  }
}
