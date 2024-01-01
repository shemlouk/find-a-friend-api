import { CepApi } from '@core/application/contracts/cep-api';

export class ViaCepApiAdapter implements CepApi {
  async getAddressDataFromCep(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) throw new Error('Address not found.');
      const { logradouro, bairro, localidade, uf } = data;

      return Object.freeze({
        street: logradouro,
        neighborhood: bairro,
        city: localidade,
        state: uf,
      });
    } catch (error) {
      return undefined;
    }
  }
}
