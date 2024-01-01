import { ApplicationException } from './application-exception';

export class ResourceConflictError extends ApplicationException {
  constructor(item: string) {
    super(`${item.charAt(0).toUpperCase() + item.slice(1)} already in use.`);
    this.name = 'ResourceConflictError';
  }
}
