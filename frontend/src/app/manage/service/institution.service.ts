import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppCrudService } from '../../core/services/core/app-crud.service';
import { InstitutionDto } from '../model/manage.dto';

@Injectable()
export class InstitutionService extends AppCrudService<InstitutionDto> {
  constructor(http: HttpClient) {
    super(http, '/api/institution');
  }

  public readById(id: number): Observable<InstitutionDto> {
    throw new Error('not implemented');
  }
}
