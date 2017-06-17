import {Injectable} from '@angular/core';
import {ManageService} from '../../../manage/service/manage.service';
import {Observable} from 'rxjs';
import {ManageDto} from '../../../manage/model/manage.dto';
import {InstitutionService} from '../../../manage/service/institution.service';

@Injectable()
export class MockManageService extends ManageService {
    constructor(private _institutionService: InstitutionService) {
        super(null);
    }

    public getManageData(): Observable<ManageDto> {
        return this._institutionService.readAll()
            .map(i => {
                return {institutions: i} as ManageDto
            });
    }
}
