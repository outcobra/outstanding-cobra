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

    readById(id: number): Observable<SemesterDto> {
        throw new Error('not implemented');
    }

    update(arg: SemesterDto): Observable<SemesterDto> {
        throw new Error('not implemented');
    }
}
