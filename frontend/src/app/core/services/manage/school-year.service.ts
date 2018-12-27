import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SchoolYearDto} from '../../../manage/old/model/manage.dto';
import {Observable} from 'rxjs';
import {AppCrudService} from '../core/app-crud.service';

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolYear');
    }

    public readById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }
}
