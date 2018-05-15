import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SemesterDto} from '../model/manage.dto';
import {AppCrudService} from '../../../core/services/core/app-crud.service';
import {DateUtil} from '../../../core/services/date-util.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SemesterService extends AppCrudService<SemesterDto> {
    constructor(http: HttpClient) {
        super(http, '/api/semester');
    }

    public readById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    public mapDates(semester: SemesterDto): SemesterDto {
        semester.validFrom = DateUtil.transformToMomentIfPossible(semester.validFrom);
        semester.validTo = DateUtil.transformToMomentIfPossible(semester.validTo);
        return semester;
    }
}
