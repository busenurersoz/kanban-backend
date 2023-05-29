import { mongooseErrorHandler } from '@kanban-project-management/common/helpers/mongoose-error-handler';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNoteFilterDto } from './dto/get-note-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createNote = new this.noteModel(createNoteDto);

    try {
      const result = await createNote.save();
      return result;
    } catch (error) {
      mongooseErrorHandler(error);
    }
  }

  async findAll(filterDto: GetNoteFilterDto) {
    const query = this.noteModel.find();

    return query.exec();
  }

  async findById(id: string) {
    const found = await this.noteModel.findById(id);
    if (!found) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    let result: Note;
    try {
      result = await this.noteModel
        .findOneAndUpdate({ _id: id }, updateNoteDto, {
          new: true,
        })
        .exec();
    } catch (error) {
      mongooseErrorHandler(error);
    }

    if (!result) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.noteModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
}
