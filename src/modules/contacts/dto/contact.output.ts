import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactOutput {
  @Field()
  name: string;

  @Field()
  cell_phone: string;
}
