import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {SchoolYearDto} from '../old/model/manage.dto';
import {Observable} from 'rxjs';

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolYear');
    }

    public readById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }
}
