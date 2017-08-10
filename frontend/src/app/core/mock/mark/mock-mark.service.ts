import {Injectable} from '@angular/core';
import {MarkService} from '../../../mark/service/mark.service';
import {SemesterMarkDto, SubjectMarkDto} from '../../../mark/model/semester-mark.dto';
import {MockSemesterService} from '../manage/manage-entities/mock-semester.service';
import {MockInstitutionService} from '../manage/manage-entities/mock-institution.servicce';
import {MockSchoolClassService} from '../manage/manage-entities/mock-school-class.service';
import {MockSubjectService} from '../manage/manage-entities/mock-subject.service';
import {MarkGroupDto} from '../../../mark/model/mark-group.dto';
import {MarkDto} from '../../../mark/model/mark.dto';

@Injectable()
export class MockMarkService extends MarkService {
    public static readonly MARK_1: MarkDto = {
        id: 1,
        description: 'desc',
        value: 5,
        markGroupId: 1,
        weight: 1,
        examId: 0
    };

    public static readonly SUBJECT_MARK_GROUP_1: MarkGroupDto = {
        id: 1,
        value: 5,
        description: 'desc',
        markValues: [MockMarkService.MARK_1],
        weight: 1,
        parentGroupId: null,
        subjectId: MockSubjectService.SUBJECT1_OF_SEMESTER1.id,
        markGroups: []
    };

    public static readonly SUBJECT_MARK_1: SubjectMarkDto = {
        id: MockSubjectService.SUBJECT1_OF_SEMESTER1.id,
        name: MockSubjectService.SUBJECT1_OF_SEMESTER1.name,
        color: MockSubjectService.SUBJECT1_OF_SEMESTER1.color,
        subjectMarkGroup: MockMarkService.SUBJECT_MARK_GROUP_1
    };

    public static readonly SEMESTER_MARK_1: SemesterMarkDto = {
        id: MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1.id,
        validFrom: MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1.validFrom,
        validTo: MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1.validTo,
        name: MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1.name,
        subjects: [
            MockMarkService.SUBJECT_MARK_1
        ],
        institution: MockInstitutionService.INSTITUTION1,
        schoolClass: MockSchoolClassService.SCHOOLCLASS1_OF_INSTITUTION1,
        value: MockMarkService.SUBJECT_MARK_GROUP_1.value
    };
}
