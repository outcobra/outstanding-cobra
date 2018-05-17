import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {SemesterDto} from '../old/model/manage.dto';
import {DateUtil} from '../../core/services/date-util.service';

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
