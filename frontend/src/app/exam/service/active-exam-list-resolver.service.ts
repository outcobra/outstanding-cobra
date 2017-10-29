import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ExamDto} from '../model/exam.dto';
import {Observable} from 'rxjs/Observable';
import {ExamService} from './exam.service';

@Injectable()
export class ActiveExamListResolver implements Resolve<ExamDto[]> {

    constructor(private _examService: ExamService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExamDto[]> | Promise<ExamDto[]> | ExamDto[] {
        return this._examService.readAllActive();
    }

}
