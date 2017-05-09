import {HttpInterceptor} from '../../http/HttpInterceptor';

/**
 * AppService which contains just an http-Client and the baseUri for the REST-Endpoints
 */
export abstract class AppService {
    constructor(protected _http: HttpInterceptor, protected _baseUri: string) {}
}
