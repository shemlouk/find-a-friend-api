import { ApplicationException } from './application-exception';

export class ResourceNotFoundError extends ApplicationException {
  constructor(item: string) {
    super(`${item.charAt(0).toUpperCase() + item.slice(1)} was not found.`);
    this.name = 'ResourceNotFound';
  }
}
