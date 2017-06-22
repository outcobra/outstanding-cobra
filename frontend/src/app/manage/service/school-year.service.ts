import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {SchoolYearDto} from '../model/manage.dto';
import {Observable} from 'rxjs';
import {AppCrudService} from '../../core/services/core/app-crud.service';

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/schoolYear');
    }

    public readById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }
}
