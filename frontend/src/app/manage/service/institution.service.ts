import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {InstitutionDto} from "../model/ManageDto";

@Injectable()
export class InstitutionService {

    constructor(private http: HttpInterceptor) {}

    public createInstitution(institution: InstitutionDto): Observable<any> {
        return this.http.put('/institution', institution, 'outcobra')
    }
}
