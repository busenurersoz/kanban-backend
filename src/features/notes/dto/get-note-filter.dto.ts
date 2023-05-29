import { IsOptional, IsString } from 'class-validator';

export class GetNoteFilterDto {
  @IsOptional()
  @IsString()
  label: string;
}
