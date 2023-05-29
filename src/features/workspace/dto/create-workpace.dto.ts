import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @MinLength(2)
  key: string;

  @IsOptional()
  description: Record<string, unknown>;

  @IsOptional()
  openAccess: boolean;
}
