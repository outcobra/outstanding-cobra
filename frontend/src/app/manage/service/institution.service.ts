import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {Institution} from "../model/ManageData";

@Injectable()
export class InstitutionService {

    constructor(private http: HttpInterceptor) {}

    public createInstitution(institution: Institution): Observable<any> {
        console.log(institution);
        return this.http.put('/institution', institution, 'outcobra')
    }
}
