import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Todo {
  @Prop({ required: true })
  label: string;

  @Prop({ default: false })
  checked: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
