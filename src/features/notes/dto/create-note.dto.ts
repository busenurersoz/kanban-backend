import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @MinLength(5)
  label: string;
}
