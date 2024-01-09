import { Org } from '@core/domain/entities/org';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { CepApi } from '../contracts/cep-api';
import { AddressNotFoundError } from '../errors/address-not-found';
import { ResourceConflictError } from '../errors/resource-conflict';

export class RegisterOrg {
  constructor(
    private orgRepository: OrgRepository,
    private cepApi: CepApi,
  ) {}

  async execute(input: InputBoundary): Promise<OutputBoundary> {
    const addressData = await this.cepApi.getAddressDataFromCep(input.cep);
    if (!addressData) throw new AddressNotFoundError(input.cep);

    const isEmailInUse = await this.orgRepository.findByEmail(input.email);
    if (isEmailInUse) throw new ResourceConflictError('Email');

    const isPhoneInUse = await this.orgRepository.findByPhone(input.phone);
    if (isPhoneInUse) throw new ResourceConflictError('Phone');

    const { street, neighborhood, city, state } = addressData;
    const completeAddress = [street, neighborhood, city, state].join(', ');

    const org = await this.orgRepository.create(
      new Org({ ...input, city, completeAddress }),
    );

    return { org: org.toObject() };
  }
}

interface InputBoundary {
  cep: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface OutputBoundary {
  org: {
    id: string;
    name: string;
    contact: {
      phone: string;
      email: string;
    };
    address: {
      cep: string;
      city: string;
      completeAddress: string;
    };
  };
}
