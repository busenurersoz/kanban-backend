import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Seeder } from './seeder.service';
import { UserSeederModule } from './users/user-seeder.module';
import { configValidationSchema } from '@kanban-project-management/config/app/config.schema';
import { ProjectSeederModule } from './projects/project-seeder.module';
import { IssueSeederModule } from './issues/issue-seeder.module';
import { CommentSeederModule } from './comments/comment-seeder.module';
import { MongoRootProviderModule } from '@kanban-project-management/providers/database/mongo/root-provider.module';
import { WorkspacesModule } from '@kanban-project-management/features/workspace/workpace.module';
import { TodoSeederModule } from './todo/todo-seeder.module';
import { NoteSeederModule } from './notes/note-seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    MongoRootProviderModule,
    UserSeederModule,
    ProjectSeederModule,
    WorkspacesModule,
    IssueSeederModule,
    CommentSeederModule,
    TodoSeederModule,
    NoteSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
