import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateContactInput } from '../dto/create-contact.input';
import { Contact } from '../entities/mongo/contact.entity';

@Injectable()
export class MongoRepository {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  public async createContacts(input: CreateContactInput[]): Promise<Contact[]> {
    return await this.contactModel.insertMany(input);
  }
}
