/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { ContactOutput } from './dto/contact.output';
import { CreateContactInput } from './dto/create-contact.input';
import { ContactsService } from './contacts.service';

@Resolver('Contact')
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => [ContactOutput])
  async createContacts(
    @Args('contacts', { type: () => [CreateContactInput] })
    contacts: CreateContactInput[],
    @Context() context,
  ): Promise<ContactOutput[]> {
    const client = context.client;
    return await this.contactsService.saveToDatabase(contacts, client);
  }
}
