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
        return super.create(semester);
    }

    readById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    readAll(): Observable<SemesterDto[]> {
        throw new Error('not implemented');
    }

    deleteById(id: number): Observable<any> {
        return super.deleteById(id);
    }

    update(arg: SemesterDto): Observable<SemesterDto> {
        throw new Error('not implemented');
    }
}
