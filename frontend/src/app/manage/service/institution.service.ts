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
        return super.create(institution);
    }

    readById(id: number): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }

    readAll(): Observable<InstitutionDto[]> {
        throw new Error('not implemented');
    }

    deleteById(id: number): Observable<any> {
        return super.deleteById(id);
    }

    update(arg: InstitutionDto): Observable<InstitutionDto> {
        throw new Error('not implemented');
    }
}
