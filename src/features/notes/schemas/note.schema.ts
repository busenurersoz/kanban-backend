import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Note {
  @Prop({ unique: true, required: true })
  label: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
