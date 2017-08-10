import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Observable} from 'rxjs';
import {SemesterDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {DateUtil} from '../../core/services/date-util.service';

@Injectable()
export class SemesterService extends AppCrudService<SemesterDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/semester');
    }

    public readById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    public mapDates(semester: SemesterDto): SemesterDto {
        semester.validFrom = DateUtil.transformToDateIfPossible(semester.validFrom);
        semester.validTo = DateUtil.transformToDateIfPossible(semester.validTo);
        return semester;
    }
}
