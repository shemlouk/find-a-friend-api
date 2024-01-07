import { Org } from '@core/domain/entities/org';
import { OrgRepository } from '@core/domain/repositories/org-repository';

export class OrgInMemoryRepository implements OrgRepository {
  readonly orgs: Org[];

  constructor() {
    this.orgs = [];
  }

  async create(org: Org) {
    this.orgs.push(org);
    return org;
  }

  async findById(orgId: string) {
    return this.orgs.find((org) => org.id === orgId);
  }

  async findByEmail(email: string) {
    return this.orgs.find((o) => o.toObject().contact.email === email);
  }

  async findByPhone(phone: string) {
    return this.orgs.find((o) => o.toObject().contact.phone === phone);
  }

  async findManyByCity(city: string) {
    return this.orgs.filter((org) => org.toObject().address.city === city);
  }
}
