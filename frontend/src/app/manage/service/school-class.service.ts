import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Observable} from 'rxjs';
import {SchoolClassDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/schoolClass')
    }

    public readById(id: number): Observable<SchoolClassDto> {
        throw new Error('not implemented');
    }

}
