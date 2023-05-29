import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSeeder } from './note-seeder.service';
import {
  Note,
  NoteSchema,
} from '@kanban-project-management/features/notes/schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [NoteSeeder],
  exports: [NoteSeeder],
})
export class NoteSeederModule {}
