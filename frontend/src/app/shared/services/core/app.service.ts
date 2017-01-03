import {HttpInterceptor} from "../../http/HttpInterceptor";

export abstract class AppService<T> {
    constructor(protected http: HttpInterceptor, protected baseUri: string) {}
}
