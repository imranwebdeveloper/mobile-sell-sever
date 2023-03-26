import { IsString, MaxLength } from 'class-validator';
export class CommentDto {
  @IsString()
  @MaxLength(220)
  comment: string;
}
