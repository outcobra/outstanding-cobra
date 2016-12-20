import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {ManageDto} from "../model/ManageDto";
import "rxjs/add/operator/map";

@Injectable()
export class ManageService {

    constructor(private http: HttpInterceptor) {
    }

    public getManageData(): Observable<ManageDto> {
        return this.http.get<ManageDto>('/manage', 'outcobra');
    }

}
