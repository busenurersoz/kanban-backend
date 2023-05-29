import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Workspace {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: true, required: true, uppercase: true })
  key: string;

  @Prop({ type: Object })
  description: any;

  @Prop()
  openAccess: boolean;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
