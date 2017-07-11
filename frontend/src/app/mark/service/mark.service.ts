import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../core/services/core/app.service';
import {MarkDto} from '../model/mark.dto';
import {MarkGroupDto} from '../model/mark-group.dto';

export const MARK_PATTERN: RegExp = /^(([1-5](\.[0-9]{1,2})?)|6(\.00?)?)$/;
export const WEIGHT_PATTERN: RegExp = /^(([0-9](\.[0-9]{1,2})?)|10(\.00?)?)$/;

@Injectable()
export class MarkService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/mark');
    }

    public getMarkSemesterBySemesterId(semesterId: number): Observable<SemesterMarkDto> {
        return this._http.get<SemesterMarkDto>(`${this._baseUri}/semester/${semesterId}`);
    }

    public getMarkById(markId: number): Observable<MarkDto> {
        return this._http.get<MarkDto>(`${this._baseUri}/value/${markId}`);
    }

    public getMarkGroupById(groupId: number): Observable<MarkGroupDto> {
        return this._http.get<MarkGroupDto>(`${this._baseUri}/group/${groupId}`);
    }

    public deleteMark(id: number): Observable<any> {
        return this._http.delete(`${this._baseUri}/value/${id}`);
    }

    public deleteMarkGroup(id: number): Observable<any> {
        return this._http.delete(`${this._baseUri}/group/${id}`);
    }

    public saveMark(mark: MarkDto): Observable<MarkGroupDto> {
        return this._http.post<MarkGroupDto>(`${this._baseUri}/value`, mark);
    }

    public saveMarkGroup(markGroup: MarkGroupDto): Observable<MarkGroupDto> {
        return this._http.post<MarkGroupDto>(`${this._baseUri}/group`, markGroup);
    }

    public getMarksBySubjectId(subjectId: number): Observable<Array<MarkDto>> {
        return this._http.get<Array<MarkDto>>(`${this._baseUri}/subject/${subjectId}/value`);
    }

    public getMarkGroupBySubjectId(subjectId: number): Observable<MarkGroupDto> {
        return this._http.get<MarkGroupDto>(`${this._baseUri}/subject/${subjectId}/group`);
    }
}
