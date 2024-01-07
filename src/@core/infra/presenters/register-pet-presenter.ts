import { OutputBoundary } from '@core/application/use-cases/register-pet';

export class RegisterPetPresenter {
  http({ org, pet }: OutputBoundary) {
    //eslint-disable-next-line
    const { orgId, ...petWithoutOrgId } = pet;

    return Object.freeze({
      ...petWithoutOrgId,
      org: {
        id: org.id,
        name: org.name,
        phoneNumber: org.contact.phone,
        ...org.address,
      },
    });
  }
}
