import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {SchoolYearDto} from "../model/ManageDto";
import {Observable} from "rxjs";
import {AppCrudService} from "../../shared/services/core/app-crud.service";

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/schoolYear');
    }

    create(schoolYear: SchoolYearDto): Observable<SchoolYearDto> {
        return this.http.put<SchoolYearDto>('/schoolYear', schoolYear, 'outcobra')
    }

    getById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }

    getAll(): Observable<SchoolYearDto[]> {
        throw new Error('not implemented');
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, 'outcobra');
    }

    update(arg: SchoolYearDto): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }
}
