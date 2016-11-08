import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Response} from "@angular/http";
import {ManageData} from "./manage-data";

@Injectable()
export class ManageService {

    constructor(private http: HttpInterceptor) {}

    public getManageData(): Observable<Response> {
        return this.http.get('/manage', 'outcobra');
    }

    public createInstitution(institutionName: string): Observable<Response> {
        return this.http.post('/institution', {
            institutionName: institutionName
        }, 'outcobra')
    }

}
