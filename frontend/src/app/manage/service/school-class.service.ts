import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../shared/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {SchoolClassDto} from '../model/ManageDto';
import {AppCrudService} from '../../shared/services/core/app-crud.service';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/schoolClass')
    }

    public readById(id: number): Observable<SchoolClassDto> {
        throw new Error('not implemented');
    }

}
