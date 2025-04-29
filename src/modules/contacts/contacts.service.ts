import { Injectable } from '@nestjs/common';
import { SqlRepository } from './repository/mysql.repository';
import { MongoRepository } from './repository/mongo.repository';
import { CreateContactInput } from './dto/create-contact.input';
import { ContactOutput } from './dto/contact.output';

@Injectable()
export class ContactsService {
  constructor(
    private readonly sqlRepository: SqlRepository,
    private readonly mongoRepository: MongoRepository,
  ) {}

  private formatName(name: string, client: string): string {
    if (client === 'macapa') {
      return name.toUpperCase();
    }
    return name;
  }

  private formatPhone(cell_phone: string, client: string): string {
    const numbersOnly = cell_phone.replace(/\D/g, '');

    if (client === 'macapa') {
      const countryCode = numbersOnly.slice(0, 2);
      const areaCode = numbersOnly.slice(2, 4);
      const firstPart = numbersOnly.slice(4, 9);
      const secondPart = numbersOnly.slice(9, 13);
      return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
    }

    if (client === 'varejao') {
      return numbersOnly;
    }

    return cell_phone;
  }

  public async saveToDatabase(
    contacts: CreateContactInput[],
    client: string,
  ): Promise<ContactOutput[]> {
    const formattedContacts = contacts.map((contact) => ({
      name: this.formatName(contact.name, client),
      cell_phone: this.formatPhone(contact.cell_phone, client),
    }));

    if (client === 'macapa') {
      await this.sqlRepository.createContacts(formattedContacts);
    } else if (client === 'varejao') {
      await this.mongoRepository.createContacts(formattedContacts);
    }

    return formattedContacts;
  }
}
