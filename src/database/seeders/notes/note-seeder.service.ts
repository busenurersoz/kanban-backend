import {
  Note,
  NoteDocument,
} from '@kanban-project-management/features/notes/schemas/note.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ClientSession } from 'mongoose';

@Injectable()
export class NoteSeeder {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async seed(session: ClientSession) {
    await this.noteModel.deleteMany({}, { session });
    // await this.todoModel.insertMany(users, { session });
  }
}
