import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Observable} from "rxjs";
import {InstitutionDto} from "../model/ManageDto";

@Injectable()
export class InstitutionService {
    private readonly baseUri: string = '/institution';

    constructor(private http: HttpInterceptor) {}

    public createInstitution(institution: InstitutionDto): Observable<InstitutionDto> {
        return this.http.put<InstitutionDto>(this.baseUri, institution, 'outcobra')
    }

    public deleteInstitution(institution: InstitutionDto): Observable<any> {
        return this.http.delete(`${this.baseUri}/${institution.id}`, 'outcobra');
    }
}
