import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Observable} from 'rxjs/Observable';
import {InstitutionDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';

@Injectable()
export class InstitutionService extends AppCrudService<InstitutionDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/institution');
    }

    public readById(id: number): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }
}
