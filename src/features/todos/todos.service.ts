import { mongooseErrorHandler } from '@kanban-project-management/common/helpers/mongoose-error-handler';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ClientSession, Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createTodo = new this.todoModel(createTodoDto);

    try {
      const result = await createTodo.save();
      return result;
    } catch (error) {
      mongooseErrorHandler(error);
    }
  }

  async findAll(filterDto: GetTodoFilterDto) {
    const query = this.todoModel.find();
    return query.exec();
  }

  async findById(id: string) {
    const found = await this.todoModel.findById(id);
    if (!found) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateNoteDto: UpdateTodoDto) {
    let result: Todo;
    try {
      result = await this.todoModel
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
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
