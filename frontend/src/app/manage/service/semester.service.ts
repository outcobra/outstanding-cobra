import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {SemesterDto} from '../old/model/manage.dto';
import {DateUtil} from '../../core/services/date-util.service';

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
