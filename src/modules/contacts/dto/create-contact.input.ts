import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  name: string;

  @Field()
  cell_phone: string;
}
