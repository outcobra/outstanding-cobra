import {Injectable} from '@angular/core';
import {ManageService} from '../../../manage/old/service/manage.service';
import {Observable} from 'rxjs';
import {ManageDto} from '../../../manage/old/model/manage.dto';
import {InstitutionService} from '../../../manage/old/service/institution.service';

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
