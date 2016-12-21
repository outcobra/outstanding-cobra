import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {SchoolYearDto} from "../model/ManageDto";
import {Observable} from "rxjs";

@Injectable()
export class SchoolYearService {
    private readonly baseUri: string = '/schoolYear';

    constructor(private http: HttpInterceptor) {}

    public createSchoolYear(schoolYear: SchoolYearDto): Observable<any> {
        return this.http.put<SchoolYearDto>('/schoolYear', schoolYear, 'outcobra')
    }

    public deleteSchoolYear(schoolYear: SchoolYearDto): Observable<any> {
        return this.http.delete(`${this.baseUri}/${schoolYear.id}`, 'outcobra');
    }
}
