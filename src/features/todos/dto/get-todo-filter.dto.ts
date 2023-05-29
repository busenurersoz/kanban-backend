import { IsOptional, IsString } from 'class-validator';

export class GetTodoFilterDto {
  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  checked: string;
}
