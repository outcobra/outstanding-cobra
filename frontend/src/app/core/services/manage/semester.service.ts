import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateUtil} from '../date-util.service';
import {AppCrudService} from '../core/app-crud.service';
import { SemesterDto } from '../../model/manage/semester.dto';

@Injectable()
export class SemesterService extends AppCrudService<SemesterDto> {
    constructor(http: HttpClient) {
        super(http, '/api/semester');
    }

    public mapDates(semester: SemesterDto): SemesterDto {
        semester.validFrom = DateUtil.transformToMomentIfPossible(semester.validFrom);
        semester.validTo = DateUtil.transformToMomentIfPossible(semester.validTo);
        return semester;
    }
}
