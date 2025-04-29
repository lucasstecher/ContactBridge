import { contactsTable } from '../entities/mysql/contact.entity';
import { db } from 'src/database/drizzle/connection';
import { Injectable } from '@nestjs/common';

interface ContactToSave {
  name: string;
  cell_phone: string;
}

@Injectable()
export class SqlRepository {
  public async createContacts(contacts: ContactToSave[]) {
    return await db.insert(contactsTable).values(contacts);
  }
}
