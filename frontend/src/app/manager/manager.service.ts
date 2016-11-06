import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {Institution} from "./Institution";
import 'rxjs/add/operator/map';

@Injectable()
export class ManagerService {

    constructor(private http: HttpInterceptor) {}

    public createInstitution(institutionName: string): Observable<Institution> {
        return this.http.post('/institution', {
            institutionName: institutionName
        }, 'outcobra')
            .map(res => res as Institution);
    }

}
