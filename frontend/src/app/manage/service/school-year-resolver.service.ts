import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SchoolYearService} from '../../core/services/manage/school-year.service';
import {SchoolClassService} from '../../core/services/manage/school-class.service';
import {SchoolYearDto} from '../../core/model/manage/school-year.dto';

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
