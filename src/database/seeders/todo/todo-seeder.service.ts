import {
  Todo,
  TodoDocument,
} from '@kanban-project-management/features/todos/schemas/todo.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ClientSession } from 'mongoose';

@Injectable()
export class TodoSeeder {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async seed(session: ClientSession) {
    await this.todoModel.deleteMany({}, { session });
    // await this.todoModel.insertMany(users, { session });
  }
}
