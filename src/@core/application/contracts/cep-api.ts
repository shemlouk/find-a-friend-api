export interface CepApi {
  getAddressDataFromCep(
    cep: string,
  ): Promise<
    | { street: string; neighborhood: string; city: string; state: string }
    | undefined
  >;
}
