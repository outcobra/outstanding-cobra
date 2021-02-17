import { HttpClient } from '@angular/common/http';

/**
 * AppService which contains just an http-Client and the baseUri for the REST-Endpoints
 */
export abstract class AppService {
  constructor(protected _http: HttpClient, protected _baseUri: string) {
  }
}
