import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppCrudService } from '../../core/services/core/app-crud.service';
import { SchoolClassDto } from '../model/manage.dto';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
  constructor(http: HttpClient) {
    super(http, '/api/schoolClass');
  }

  public readById(id: number): Observable<SchoolClassDto> {
    throw new Error('not implemented');
  }

}
