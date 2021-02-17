import { Moment } from 'moment';
import { ColorDto } from '../../core/model/color.dto';
import { InstitutionDto, SchoolClassDto } from '../../manage/model/manage.dto';
import { MarkGroupDto } from './mark-group.dto';

export interface SemesterMarkDto {
  id: number,
  name: string,
  validFrom: Moment,
  validTo: Moment,
  institution: InstitutionDto,
  schoolClass: SchoolClassDto,
  value: number,
  subjects: Array<SubjectMarkDto>
}

export interface SubjectMarkDto {
  id: number,
  name: string,
  color: ColorDto,
  subjectMarkGroup: MarkGroupDto
}
