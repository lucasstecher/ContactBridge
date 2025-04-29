import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true, max: 100 })
  name: string;

  @Prop({ required: true, max: 13 })
  cell_phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
