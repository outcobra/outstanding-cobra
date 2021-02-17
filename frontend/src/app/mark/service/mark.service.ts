import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../../core/services/core/app.service';
import { MarkGroupDto } from '../model/mark-group.dto';
import { MarkDto } from '../model/mark.dto';
import { SemesterMarkDto } from '../model/semester-mark.dto';

export const MARK_PATTERN: RegExp = /^(([1-5](\.[0-9]{1,2})?)|6(\.00?)?)$/;
export const WEIGHT_PATTERN: RegExp = /^(([0-9](\.[0-9]{1,2})?)|10(\.00?)?)$/;

@Injectable()
export class MarkService extends AppService {
  constructor(http: HttpClient) {
    super(http, '/api/mark');
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

  public deleteMark(mark: MarkDto): Observable<MarkDto> {
    return this._http.delete(`${this._baseUri}/value/${mark.id}`)
      .pipe(map(() => mark));
  }

  public deleteMarkGroup(markGroup: MarkGroupDto): Observable<MarkGroupDto> {
    return this._http.delete(`${this._baseUri}/group/${markGroup.id}`)
      .pipe(map(() => markGroup));
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
