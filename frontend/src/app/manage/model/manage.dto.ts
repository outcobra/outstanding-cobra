import { Moment } from 'moment';
import { Dto } from '../../core/common/dto';
import { ColorDto } from '../../core/model/color.dto';

export interface ManageDto {
  institutions: Array<InstitutionDto>
}

export interface InstitutionDto extends Dto {
  id: number,
  name: string,
  schoolClasses: Array<SchoolClassDto>
}

export interface SchoolClassDto extends Dto {
  id: number,
  institutionId: number,
  normalizedName: string,
  schoolYears: Array<SchoolYearDto>
}

export interface SchoolYearDto extends Dto {
  id: number,
  schoolClassId: number,
  name: string,
  validFrom: string | Moment,
  validTo: string | Moment,
  semesters: Array<SemesterDto>
}

export interface SemesterDto extends Dto {
  id: number,
  schoolYearId: number,
  name: string,
  validFrom: string | Moment,
  validTo: string | Moment,
  subjects: Array<SubjectDto>
}

export interface SubjectDto extends Dto {
  id: number,
  semesterId: number,
  name: string,
  color: ColorDto
}

