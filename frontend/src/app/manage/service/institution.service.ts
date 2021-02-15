import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InstitutionDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InstitutionService extends AppCrudService<InstitutionDto> {
    constructor(http: HttpClient) {
        super(http, '/api/institution');
    }

    public readById(id: number): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }
}
