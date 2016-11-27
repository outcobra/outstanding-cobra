import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {ManageData} from "./model/ManageData";
import "rxjs/add/operator/map";

@Injectable()
export class ManageService {

    constructor(private http: HttpInterceptor) {
    }

    public getManageData(): Observable<ManageData> {
        return this.http.get<ManageData>('/manage', 'outcobra');
    }

    public createInstitution(institutionName: string): Observable<any> {
        console.log(institutionName);
        return this.http.post('/institution', {
            institutionName: institutionName
        }, 'outcobra')
    }

}
