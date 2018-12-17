import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SchoolYearDto} from '../old/model/manage.dto';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SchoolYearService} from './school-year.service';
import {SchoolClassService} from './school-class.service';

@Injectable()
export class SchoolYearResolverService implements Resolve<Array<SchoolYearDto>> {
    constructor(private _schoolYearService: SchoolYearService,
                private _schoolClassService: SchoolClassService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<SchoolYearDto>> | Promise<Array<SchoolYearDto>> | Array<SchoolYearDto> {
        if (route.paramMap.has('schoolClassId')) {
            return this._schoolClassService.readSchoolYearsByClass(parseInt(route.paramMap.get('schoolClassId')));
        }
        return this._schoolYearService.readAll();
    }
}
