import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {SchoolYearDto} from "../model/ManageDto";
import {Observable} from "rxjs";

@Injectable()
export class SchoolYearService {
    constructor(private http: HttpInterceptor) {}

    public createSchoolYear(schoolYear: SchoolYearDto): Observable<any> {
        return this.http.put('/schoolYear', schoolYear, 'outcobra')
    }
}
