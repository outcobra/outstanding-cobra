import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SubjectDto} from "../model/ManageDto";

@Injectable()
export class SubjectService {
    private readonly baseUri: string = '/subject';

    constructor(private http: HttpInterceptor) {}

    public createSubject(subject: SubjectDto): Observable<any> {
        return this.http.put<SubjectDto>(this.baseUri, subject, 'outcobra')
    }

    public deleteSubject(subject: SubjectDto): Observable<any> {
        return this.http.delete(`${this.baseUri}/${subject.id}`, 'outcobra');
    }
}
