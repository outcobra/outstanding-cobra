import {Injectable} from '@angular/core';
import {CacheableService} from '../core/cacheable.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SemesterService} from '../manage/semester.service';
import { SemesterDto } from '../../model/manage/semester.dto';

@Injectable()
export class ActiveSemesterService extends CacheableService<SemesterDto[]> {
    constructor(private _semesterService: SemesterService, http: HttpClient) {
        super(http, '/api/semester');
    }

    public getSemestersByUser(): Observable<SemesterDto[]> {
        return this.getFromCacheOrFetch(() => this._semesterService.readAll());
    }
}
