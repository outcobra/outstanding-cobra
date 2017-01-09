import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SubjectDto} from "../model/ManageDto";
import {AppCrudService} from "../../shared/services/core/app-crud.service";

@Injectable()
export class SubjectService extends AppCrudService<SubjectDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/subject')
    }

    create(subject: SubjectDto): Observable<SubjectDto> {
        return super.create(subject);
    }

    readById(id: number): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    readAll(): Observable<SubjectDto[]> {
        return super.readAll();
    }

    deleteById(id: number): Observable<any> {
        return super.deleteById(id);
    }

    update(arg: SubjectDto): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    getCurrentSubjects(): Observable<SubjectDto[]> {
        return this.http.get<SubjectDto[]>(`/semester/current/${this.baseUri}`, 'outcobra');
    }
}
