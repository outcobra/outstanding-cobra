import {Injectable} from "@angular/core";
import {Http, Request, RequestMethod, URLSearchParams, Response} from "@angular/http";
import {NotificationsService} from "angular2-notifications";
import {Config} from "../../config/Config";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import * as _ from "underscore";

@Injectable()
/**
 * HttpInterceptor to customize the http request and http responses
 *
 * uses the Http class in the @angular/http module
 *
 * adds default headers like Content-Type or Auth Token
 * every api that we want to call needs to be registered in the config files of the application
 * the config object of an api lets us define the following properties
 *      name: name of the api
 *      apiBase: base address of the api e.g. http://localhost:8080/api
 *      authToken: boolean which tells whether or not the api needs the authToken from the authService
 *
 *
 */
export class HttpInterceptor {

    private apiNames: string[];
    private defaultApiName: string;

    constructor(private http: Http, private notificationsService: NotificationsService, private config: Config) {
        this.defaultApiName = this.config.get('api.defaultApiName');
        this.apiNames = this.config.get('api.apis')
            .map(api => {
            return api['name']
        });
    }

    /**
     * performs an http request with the method described in the request object
     *
     * @param request
     * @returns {Observable<T>}
     */
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
        }).map((res: Response) => this.unwrapAndCastHttpResponse<T>(res));
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
     * @returns {Observable<T>}
     */
    get<T>(url: string, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Get,
            url: url,
            params: params,
            apiName: apiName
        });
    }

    /**
     * performs a simple post request
     *
     * @param url as string
     * @param data which needs to be sent as request body
     * @param params additional parameters(headers)
     * @param apiName name of the api to call (described in the config file)
     * @returns {Observable<T>}
     */
    post<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Post,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        })
    }

    /**
     * performs a simple put request
     *
     * @param url as string
     * @param data which needs to be sent as request body
     * @param params additional parameters(headers)
     * @param apiName name of the api to call (described in the config file)
     * @returns {Observable<T>}
     */
    put<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Put,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        });
    }

    /**
     * performs a simple delete request
     *
     * @param url as string
     * @param params additional parameters(headers)
     * @param apiName name of the api to call (described in the config file)
     * @returns {Observable<T>}
     */
    delete<T>(url: string, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Delete,
            url: url,
            params: params,
            apiName: apiName
        });
    }

    /**
     * performs a simple patch request
     *
     * @param url as string
     * @param data which needs to be sent as request body
     * @param params additional parameters(headers)
     * @param apiName name of the api to call (described in the config file)
     * @returns {Observable<T>}
     */
    patch<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Patch,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        });
    }

///////////////////////////////////////////////////////////////////////////
///////// Helper Functions ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

    /**
     * interpolates the url in the requestOptions
     * replaces strings like ':paramName' with the corresponding value in the params object of the requestOptions
     * the interpolated values will be removed from the requetsOptions object
     *
     * the placeholders in the url must begin with a letter an can then contain any alphanumeric characters and also dashes
     *
     * /resource/:id --> /resource/1
     *
     * @param requestOptions
     * @returns returns the requestOptions object with the updated url
     */
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

    /**
     * returns the value of a key in an object
     * afterwards it removes the key-value-pair from the object
     *
     * @param obj Object to extract value from
     * @param key to remove and return value from it
     * @returns value of the key in the object
     */
    private extractValue(obj: Object, key: string): any {
        let value = obj[key];
        delete obj[key];
        return value;
    }

    /**
     * adds the Content-Type: application/json header when the request is not Get or Delete
     *
     * @param request requestOptions object
     * @returns requestOptions object with the updated headers
     */
    private addContentType(request: any) {
        if (request.method !== RequestMethod.Get || request.method !== RequestMethod.Delete) {
            request.headers['Content-Type'] = "application/json ; charset=UTF-8";
        }
        return request;
    }

    /**
     * builds the query string with the angular 2 URLSearchParams class
     *
     * @param params object containing the params
     * @returns {URLSearchParams} all search params
     */
    private buildUrlSearchParams(params: {}|any) {
        let urlParams = new URLSearchParams();
        for (let key in params) {
            urlParams.append(key, params[key]);
        }
        return urlParams;
    }

    /**
     * adds the auth token to the headers if the authToken flag of the api is true
     *
     * @param request
     */
    private addAuthToken(request) {
        let api = this.getApiFromConfig(request.apiName);
        if (api.authToken === true) {
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem(this.config.get('locStorage.tokenLocation'));
        }
    }

    /**
     * unwraps an http response and returns it as T
     *
     * @param response
     * @returns http response as T
     */
    private unwrapAndCastHttpResponse<T>(response: Response): T {
        return response.json() as T;
    }

    /**
     * Builds the url for a request by combining the apis base and the request url
     *
     * @param request
     * @returns {string} Request url
     */
    private buildApiUrl(request): string {
        let api = this.getApiFromConfig(request.apiName);
        return this.removeRepeatedSlashes(`${api['apiBase']}/${request.url}`); // concat Url and remove double slashes
    }

    /**
     * gets the api config object from the Config service and returns it
     *
     * @param apiName
     * @returns {any} api object from the config
     */
    private getApiFromConfig(apiName: string) {
        let name = (this.apiNames.indexOf(apiName) >= 0) ? apiName : this.defaultApiName;
        return this.config.get('api.apis')
            .find(api => api.name === name);
    }

    /**
     * removes double slashes in the url except after the protocol
     *
     * @param str url
     * @returns {string} formatted url
     */
    private removeRepeatedSlashes(str: string): string {
        return str.replace(/([^:])\/{2,}/g, (match, prefix) => prefix + '/');
    }
}

