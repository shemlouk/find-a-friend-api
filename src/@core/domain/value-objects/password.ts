import { createHmac } from 'node:crypto';

const SECRET_KEY = '827ae389-efc3-476d-aadd-f75b97c794fc';

export class Password {
  #hashedPassword: string;

  constructor(password: string) {
    // eslint-disable-next-line
    const [_, tag] = password.split('.');

    tag === 'h'
      ? (this.#hashedPassword = password)
      : (this.#hashedPassword = Password.hash(password));
  }

  static hash(data: string) {
    const hmac = createHmac('sha256', SECRET_KEY);
    return hmac.update(data).digest('base64') + '.h';
  }

  compare(value: string) {
    return Password.hash(value) === this.#hashedPassword;
  }

  get hash() {
    return this.#hashedPassword;
  }
}
