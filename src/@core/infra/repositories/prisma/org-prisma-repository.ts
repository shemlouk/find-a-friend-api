import { Org } from '@core/domain/entities/org';
import { OrgRepository } from '@core/domain/repositories/org-repository';
import { PrismaClient } from '@prisma/client';

export class OrgPrismaRepository implements OrgRepository {
  constructor(private prisma: PrismaClient) {}

  async create(org: Org) {
    const { id, name, address, contact, hashedPassword } = org.toObject();

    await this.prisma.org.create({
      data: {
        id,
        name,
        ...address,
        hashedPassword,
        email: contact.email,
        phoneNumber: contact.phone,
      },
    });

    return org;
  }

  async findById(orgId: string) {
    const data = await this.prisma.org.findUnique({ where: { id: orgId } });

    return (
      data &&
      new Org(
        { ...data, phone: data.phoneNumber, password: data.hashedPassword },
        data.id,
      )
    );
  }

  async findByEmail(email: string) {
    const data = await this.prisma.org.findUnique({ where: { email } });

    return (
      data &&
      new Org(
        { ...data, phone: data.phoneNumber, password: data.hashedPassword },
        data.id,
      )
    );
  }

  async findByPhone(phone: string) {
    const data = await this.prisma.org.findUnique({
      where: { phoneNumber: phone },
    });

    return (
      data &&
      new Org(
        { ...data, phone: data.phoneNumber, password: data.hashedPassword },
        data.id,
      )
    );
  }

  async findManyByCity(city: string) {
    const data = await this.prisma.org.findMany({ where: { city } });

    return data.map(
      (d) =>
        new Org(
          { ...d, phone: d.phoneNumber, password: d.hashedPassword },
          d.id,
        ),
    );
  }
}
