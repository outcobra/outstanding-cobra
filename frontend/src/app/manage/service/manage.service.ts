import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {ManageDto} from "../model/ManageDto";
import "rxjs/add/operator/map";
import {AppService} from "../../shared/services/core/app.service";

@Injectable()
export class ManageService extends AppService<ManageDto> {

    constructor(http: HttpInterceptor) {
        super(http, '/manage')
    }

    public getManageData(): Observable<ManageDto> {
        return this.http.get<ManageDto>(this.baseUri, 'outcobra');
    }

}
