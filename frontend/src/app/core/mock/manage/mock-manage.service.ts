import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageDto } from '../../../manage/model/manage.dto';
import { InstitutionService } from '../../../manage/service/institution.service';
import { ManageService } from '../../../manage/service/manage.service';

@Injectable()
export class MockManageService extends ManageService {
  constructor(private _institutionService: InstitutionService) {
    super(null);
  }

  public getManageData(): Observable<ManageDto> {
    return this._institutionService.readAll().pipe(
      map(i => {
        return { institutions: i } as ManageDto;
      }));
  }
}
