import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {InstitutionDto} from '../model/ManageDto';
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
