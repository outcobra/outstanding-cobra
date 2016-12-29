import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../http/HttpInterceptor";
import {Color} from "../model/Color";
import {Observable} from "rxjs";

@Injectable()
export class ColorService {
    private cache: Color[];
    private observable: Observable<Color[]>;

    constructor(private http: HttpInterceptor) {}

    public getColors(): Observable<Color[]> {
        if (this.cache) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        else {
            this.observable = this.http.get<Color[]>('/color', 'outcobra')
                .map((res: Color[]) => {
                    this.observable = null;
                    this.cache = res;
                    return this.cache;
                }).share();
            return this.observable;
        }
    }
}
