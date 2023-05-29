import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ClientSession, Model } from 'mongoose';

import { mongooseErrorHandler } from '@kanban-project-management/common/helpers/mongoose-error-handler';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schema';
import { ProjectsService } from '../projects/projects.service';
import { UpdateWorkspaceDto } from './dto/update-workpace.dto';
import { CreateWorkspaceDto } from './dto/create-workpace.dto';
import { GetWorkspaceFilterDto } from './dto/get-workpace-filter.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const createWorkspace = new this.workspaceModel(createWorkspaceDto);

    try {
      const result = await createWorkspace.save();
      return result;
    } catch (error) {
      mongooseErrorHandler(error);
    }
  }

  async findAll(filterDto: GetWorkspaceFilterDto) {
    const { name, key } = filterDto;
    const query = this.workspaceModel.find();

    if (name) {
      query.where('name', { $regex: '^' + name + '$', $options: 'i' });
    }

    if (key) {
      query.where('key', { $regex: '^' + key + '$', $options: 'i' });
    }
    return query.exec();
  }

  async findById(id: string) {
    const found = await this.workspaceModel.findById(id);
    if (!found) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    let result: Workspace;
    try {
      result = await this.workspaceModel
        .findOneAndUpdate({ _id: id }, updateWorkspaceDto, {
          new: true,
        })
        .exec();
    } catch (error) {
      mongooseErrorHandler(error);
    }
    if (!result) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }
    return result;
  }

  async remove(id: string): Promise<void> {
    const session: ClientSession = await this.workspaceModel.startSession();
    session.startTransaction();

    try {
      const result = await this.workspaceModel.deleteOne(
        { _id: id },
        { session },
      );
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Workspace with ID ${id} not found`);
      }

      await this.projectsService.deleteProjectByWorkspaceId(id, session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
