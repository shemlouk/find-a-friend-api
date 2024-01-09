import { OutputBoundary } from '@core/application/use-cases/get-pets-by-city';

export class GetPetsByCityPresenter {
  http({ petsByOrg }: OutputBoundary) {
    return Object.freeze({
      pets: petsByOrg.flatMap((org) => org.pets),
    });
  }
}
