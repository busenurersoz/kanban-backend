import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkspaceDto } from './create-workpace.dto';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
