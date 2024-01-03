export interface Jwt<T> {
  sign(payload: T, config?: { expiresIn: number }): Promise<string>;
  verify(token: string): Promise<T | undefined>;
}
