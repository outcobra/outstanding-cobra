import {Injectable} from '@angular/core';
import {SchoolYearDto} from '../model/manage.dto';
import {Observable} from 'rxjs/Observable';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolYear');
    }

    public readById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }
}
