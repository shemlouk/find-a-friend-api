import { OutputBoundary } from '@core/application/use-cases/register-org';

export class RegisterOrgPresenter {
  http({ org }: OutputBoundary) {
    const { cep, completeAddress } = org.address;

    const formatedCep = cep.slice(0, -3) + '-' + cep.slice(-3);

    const [s, n, ...rest] = completeAddress.split(',');
    const formatedAddress = [s, n].join(',') + '-' + rest.join(',') + '.';

    return Object.freeze({
      org: {
        id: org.id,
        name: org.name,
        email: org.contact.email,
        contact: org.contact.phone,
        cep: formatedCep,
        completeAddress: formatedAddress,
      },
    });
  }
}
