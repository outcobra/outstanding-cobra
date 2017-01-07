import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SemesterDto} from "../model/ManageDto";
import {AppCrudService} from "../../shared/services/core/app-crud.service";

@Injectable()
export class SemesterService extends AppCrudService<SemesterDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/semester');
    }

    create(semester: SemesterDto): Observable<SemesterDto> {
        return this.http.put<SemesterDto>('/semester', semester, 'outcobra')
    }

    getById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    getAll(): Observable<SemesterDto[]> {
        throw new Error('not implemented');
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, 'outcobra');
    }

    update(arg: SemesterDto): Observable<SemesterDto> {
        throw new Error('not implemented');
    }
}
