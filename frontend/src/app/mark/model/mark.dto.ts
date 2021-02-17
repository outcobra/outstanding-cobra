import { BaseMarkDto } from './base-mark.dto';

export interface MarkDto extends BaseMarkDto {
  examId: number,
  markGroupId: number
}
