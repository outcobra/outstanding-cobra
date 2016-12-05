import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SchoolClassDto} from "../model/ManageDto";

@Injectable()
export class SchoolClassService {

    constructor(private http: HttpInterceptor) {}

    public createSchoolClass(schoolClass: SchoolClassDto): Observable<any> {
        return this.http.put<SchoolClassDto>('/schoolClass', schoolClass, 'outcobra')
    }
}
