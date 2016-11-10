import {Injectable} from "@angular/core";
import {Http, Request, Response, RequestMethod, URLSearchParams} from "@angular/http";
import {NotificationsService} from "angular2-notifications";
import {Config} from "../../config/Config";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import * as _ from "underscore";

@Injectable()
export class HttpInterceptor {

    private apiNames: string[];
    private defaultApiName: string;

    constructor(private http: Http, private notificationsService: NotificationsService, private config: Config) {
        this.defaultApiName = this.config.get('api.defaultApiName');
        this.apiNames = this.config.get('api.apis').map(api => {
            return api['name']
        });
    }

    request<T>(request: any): Observable<T> {
        request.method = (request.method || RequestMethod.Get);
        request.url = (request.url || '');
        request.headers = (request.headers || {});
        request.data = (request.data || {});
        request.params = (request.params || {});
        request.apiName = (request.apiName || this.defaultApiName);

        this.interpolateUrl(request);

        this.addContentType(request);

        this.addAuthToken(request);

        return this.http.request(
            new Request({
                method: request.method,
                url: this.buildApiUrl(request),
                headers: request.headers,
                search: this.buildUrlSearchParams(request.params),
                body: JSON.stringify(request.data)
            })
        ).catch(error => {
            this.notificationsService.error('http.error.title', 'http.error.message'); // TODO i18n + i18nKey by error.status
            return Observable.empty();
        }).map((res) => this.unwrapHttpResponse<T>(res));
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////// Http Functions //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    /**
     * performs a simple get request
     *
     * @param url
     * @param params
     * @param apiName
     * @returns {Observable<Response>}
     */
    get<T>(url: string, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Get,
            url: url,
            params: params,
            apiName: apiName
        });
    }

    post<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Post,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        })
    }

    put<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Put,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        });
    }

    delete<T>(url: string, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Delete,
            url: url,
            params: params,
            apiName: apiName
        });
    }

    patch<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Patch,
            url: url,
            params: params,
            apiName: apiName
        });
    }

///////////////////////////////////////////////////////////////////////////
///////// Helper Functions ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

    private interpolateUrl(requestOptions: any) {
        requestOptions.url = requestOptions.url.replace(
            /:([a-zA-Z]+[\w-]*)/g,
            ($0, token) => {
                if (_.has(requestOptions.params, token)) return this.extractValue(requestOptions.params, token);
                return "";
            }
        );
        // cleanup double slashes
        requestOptions.url = this.removeRepeatedSlashes(requestOptions.url);
        // cleanup unnecessary slashes at the end
        requestOptions.url = requestOptions.url.replace(/\/+$/g, "");
        return ( requestOptions );
    }

    private extractValue(obj, key) {
        let value = obj[key];
        delete obj[key];
        return value;
    }

    private addContentType(request: any) {
        if (request.method !== RequestMethod.Get || request.method !== RequestMethod.Delete) {
            request.headers['Content-Type'] = "application/json ; charset=UTF-8";
        }
        return request;
    }

    private buildUrlSearchParams(params: {}|any) {
        let urlParams = new URLSearchParams();
        for (let key in params) {
            urlParams.append(key, params[key]);
        }
        return urlParams;
    }

    private addAuthToken(request) {
        let api = this.getApiFromConfig(request.apiName);
        if (api.authToken === true) {
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem(this.config.get('locStorage.tokenLocation'));
        }
    }

    private unwrapHttpResponse<T>(response): T {
        return response.json() as T;
    }

    private buildApiUrl(request): string {
        let api = this.getApiFromConfig(request.apiName);
        return this.removeRepeatedSlashes(`${api['apiBase']}/${request.url}`); // concat Url and remove double slashes
    }

    private getApiFromConfig(apiName: string): any {
        let name = (this.apiNames.indexOf(apiName) >= 0) ? apiName : this.defaultApiName;
        return this.config.get('api.apis').find(api => api.name === name);
    }

    private removeRepeatedSlashes(str: string): string {
        return str.replace(/([^:])\/{2,}/g, (match, prefix) => prefix + '/');
    }
}

