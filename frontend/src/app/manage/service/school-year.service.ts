import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/HttpInterceptor';
import {SchoolYearDto} from '../model/ManageDto';
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
