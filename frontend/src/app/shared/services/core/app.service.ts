import {HttpInterceptor} from "../../http/HttpInterceptor";

export abstract class AppService {
    constructor(protected http: HttpInterceptor, protected baseUri: string) {}
}
