import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {InstitutionDto} from "../model/ManageDto";
import {AppCrudService} from "../../shared/services/core/app-crud.service";

@Injectable()
export class InstitutionService extends AppCrudService<InstitutionDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/institution');
    }

    create(institution: InstitutionDto): Observable<InstitutionDto> {
        return this.http.put<InstitutionDto>(this.baseUri, institution, 'outcobra')
    }

    getById(id: number): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }

    getAll(): Observable<InstitutionDto[]> {
        throw new Error('not implemented');
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, 'outcobra');
    }

    update(arg: InstitutionDto): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }
}
