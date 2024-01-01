import { Org } from '@core/domain/entities/org';

export interface OrgRepository {
  create(org: Org): Promise<Org>;
  findByEmail(email: string): Promise<Org | undefined>;
  findByPhone(phone: string): Promise<Org | undefined>;
}
