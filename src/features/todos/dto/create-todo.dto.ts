import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(5)
  label: string;

  @IsOptional()
  checked: boolean;
}
