import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Address, Contact, User } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test1',
      },
    });
  }

  async getUser(): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        username: 'test1',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test1',
        name: 'test1',
        password: await bcrypt.hash('test1', 10),
        token: 'test1',
      },
    });
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        username: 'test1',
      },
    });
  }

  async getContact(): Promise<Contact> {
    return this.prismaService.contact.findFirst({
      where: {
        username: 'test1',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        first_name: 'test',
        last_name: '1',
        email: 'test1@example.com',
        phone: '555',
        username: 'test1',
      },
    });
  }

  async deleteAddress() {
    await this.prismaService.address.deleteMany({
      where: {
        contact: {
          username: 'test1',
        },
      },
    });
  }

  async getAddress(): Promise<Address> {
    return this.prismaService.address.findFirst({
      where: {
        contact: {
          username: 'test1',
        },
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    await this.prismaService.address.create({
      data: {
        contact_id: contact.id,
        street: 'Jalan Testing 1',
        city: 'City Testing 1',
        province: 'Province Testing 1',
        country: 'Country Testing 1',
        postal_code: '111',
      },
    });
  }
}
