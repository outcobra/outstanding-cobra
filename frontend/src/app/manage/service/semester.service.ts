import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {SemesterDto} from '../model/ManageDto';
import {AppCrudService} from '../../core/services/core/app-crud.service';

@Injectable()
export class SemesterService extends AppCrudService<SemesterDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/semester');
    }

    public readById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    public update(arg: SemesterDto): Observable<SemesterDto> {
        throw new Error('not implemented');
    }
}
