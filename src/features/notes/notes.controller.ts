import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNoteFilterDto } from './dto/get-note-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createTodosDto: CreateNoteDto) {
    return this.notesService.create(createTodosDto);
  }

  @Get()
  findAll(@Query() filterDto: GetNoteFilterDto) {
    return this.notesService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodosDto: UpdateNoteDto) {
    return this.notesService.update(id, updateTodosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
