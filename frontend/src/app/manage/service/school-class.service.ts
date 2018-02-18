import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SchoolClassDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolClass')
    }

    public readById(id: number): Observable<SchoolClassDto> {
        throw new Error('not implemented');
    }

}
