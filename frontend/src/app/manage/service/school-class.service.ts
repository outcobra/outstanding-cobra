import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SchoolClassDto} from "../model/ManageDto";
import {AppCrudService} from "../../shared/services/core/app-crud.service";

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/schoolClass')
    }

    create(schoolClass: SchoolClassDto): Observable<SchoolClassDto> {
        return this.http.put<SchoolClassDto>(this.baseUri, schoolClass, 'outcobra')
    }

    readById(id: number): Observable<SchoolClassDto> {
        throw new Error('not implemented');
    }

    readAll(): Observable<SchoolClassDto[]> {
        return this.http.get<SchoolClassDto[]>(this.baseUri, 'outcobra');
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, 'outcobra');
    }

    update(arg: SchoolClassDto): Observable<SchoolClassDto> {
        throw new Error('not implemented');
    }
}
