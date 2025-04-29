import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { MongoRepository } from './repository/mongo.repository';
import { SqlRepository } from './repository/mysql.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './entities/mongo/contact.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  providers: [
    ContactsResolver,
    ContactsService,
    MongoRepository,
    SqlRepository,
  ],
})
export class ContactsModule {}
