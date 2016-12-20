import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SemesterDto} from "../model/ManageDto";

@Injectable()
export class SemesterService {
    private readonly baseUri: string = '/semester';

    constructor(private http: HttpInterceptor) {}

    public createSemester(semester: SemesterDto): Observable<any> {
        return this.http.put<SemesterDto>('/semester', semester, 'outcobra')
    }

    public deleteSemester(semester: SemesterDto): Observable<any> {
        return this.http.delete(`${this.baseUri}/${semester.id}`, 'outcobra');
    }
}
