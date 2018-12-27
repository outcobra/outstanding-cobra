import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SemesterDto} from '../../../manage/old/model/manage.dto';
import {DateUtil} from '../date-util.service';
import {AppCrudService} from '../core/app-crud.service';

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
