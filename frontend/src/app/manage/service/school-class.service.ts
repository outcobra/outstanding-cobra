import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {SchoolClass} from "../model/ManageData";

@Injectable()
export class SchoolClassService {

    constructor(private http: HttpInterceptor) {}

    public createSchoolClass(schoolClass: SchoolClass): Observable<any> {
        return this.http.put('/schoolClass', schoolClass, 'outcobra')
    }
}
