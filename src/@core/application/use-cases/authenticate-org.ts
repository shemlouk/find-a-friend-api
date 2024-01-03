import { OrgRepository } from '@core/domain/repositories/org-repository';
import { Jwt } from '../contracts/jwt';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { ResourceNotFoundError } from '../errors/resource-not-found';

export class AuthenticateOrg {
  constructor(
    private orgRepository: OrgRepository,
    private jwt: Jwt<{ sub: string }>,
  ) {}

  async execute(input: InputBoundary): Promise<OutputBoundary> {
    const org = await this.orgRepository.findByEmail(input.email);
    if (!org) throw new ResourceNotFoundError('Org');

    const isPasswordCorrect = org.comparePassword(input.password);
    if (!isPasswordCorrect) throw new InvalidCredentialsError();

    const payload = { sub: org.id };
    const token = await this.jwt.sign(payload);

    return { token };
  }
}

interface InputBoundary {
  email: string;
  password: string;
}

interface OutputBoundary {
  token: string;
}
