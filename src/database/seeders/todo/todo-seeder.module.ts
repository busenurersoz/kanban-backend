import {
  Todo,
  TodoSchema,
} from './../../../features/todos/schemas/todo.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSeeder } from './todo-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoSeeder],
  exports: [TodoSeeder],
})
export class TodoSeederModule {}
