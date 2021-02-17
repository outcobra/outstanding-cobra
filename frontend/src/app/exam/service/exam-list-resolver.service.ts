import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamDto } from '../model/exam.dto';
import { ExamService } from './exam.service';

@Injectable()
export class ExamListResolver implements Resolve<ExamDto[]> {

  constructor(private _examService: ExamService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExamDto[]> | Promise<ExamDto[]> | ExamDto[] {
    return this._examService.readAll();
  }

}
