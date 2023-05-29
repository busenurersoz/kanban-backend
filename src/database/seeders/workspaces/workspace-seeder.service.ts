import {
  Workspace,
  WorkspaceDocument,
} from '@kanban-project-management/features/workspace/schemas/workspace.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ClientSession } from 'mongoose';
import { workspaces } from './workspaces';

@Injectable()
export class WorkspaceSeeder {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async seed(session: ClientSession) {
    await this.workspaceModel.deleteMany({}, { session });
    await this.workspaceModel.insertMany(workspaces, { session });
  }
}
