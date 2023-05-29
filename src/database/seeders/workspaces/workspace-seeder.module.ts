import {
  Workspace,
  WorkspaceSchema,
} from '@kanban-project-management/features/workspace/schemas/workspace.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkspaceSeeder } from './workspace-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  providers: [WorkspaceSeeder],
  exports: [WorkspaceSeeder],
})
export class ProjectSeederModule {}
