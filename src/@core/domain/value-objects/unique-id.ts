import { randomUUID } from 'node:crypto';

export class UniqueID {
  #value: string;

  constructor(id?: string) {
    this.#value = id ?? randomUUID();
  }

  get value() {
    return this.#value;
  }
}
