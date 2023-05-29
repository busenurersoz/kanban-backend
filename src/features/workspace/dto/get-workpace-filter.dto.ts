import { IsOptional, IsString } from 'class-validator';

export class GetWorkspaceFilterDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  key: string;
}
