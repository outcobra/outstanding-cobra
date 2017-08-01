import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SubjectFilterDto} from '../../../task/model/subject.filter.dto';
import {Observable} from 'rxjs';
import {FilterService} from './filter.service';

@Injectable()
export class SubjectFilterResolver implements Resolve<SubjectFilterDto> {
    constructor(private _filterService: FilterService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubjectFilterDto> | Promise<SubjectFilterDto> | SubjectFilterDto {
        return this._filterService.getSubjectFilter();
    }

}
