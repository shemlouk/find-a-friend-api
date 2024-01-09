import { Jwt } from '@core/application/contracts/jwt';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = '4b776c83-c259-430c-84a7-ef39075b91c3';

export class JoseJwt implements Jwt<Payload> {
  static #secret = new TextEncoder().encode(JWT_SECRET);
  static #alg = 'HS256';

  async sign(payload: any, config?: { expiresIn: number }) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: JoseJwt.#alg })
      .setExpirationTime(config?.expiresIn ?? '1 day')
      .sign(JoseJwt.#secret);
  }

  async verify(token: string) {
    const { payload } = await jwtVerify<Payload>(token, JoseJwt.#secret);
    return Object.freeze({ sub: payload.sub });
  }
}

type Payload = { sub: string };
