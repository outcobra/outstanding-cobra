import {Injectable} from '@angular/core';
import {Http, Request, RequestMethod, Response, URLSearchParams} from '@angular/http';
import {NotificationsService} from 'angular2-notifications';
import {Config} from '../../config/Config';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {dateReplacer, dateReviver} from './http-util';
import {RequestOptions} from './RequestOptions';
import {HttpError} from '../model/HttpError';

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
@Injectable()
export class HttpInterceptor {
    private _apiNames: string[];
    private _defaultApiName: string;

    constructor(private http: Http, private notificationsService: NotificationsService, private config: Config) {
        this._defaultApiName = this.config.get('api.defaultApiName');
        this._apiNames = this.config.get('api.apis')
            .map(api => api['name']);
    }

    /**
     * performs an _http request with the method described in the request object
     *
     * @param request
     * @returns {Observable<T>}
     */
    request<T>(request: RequestOptions): Observable<T> {
        request.method = (request.method || RequestMethod.Get);
        request.url = (request.url || '');
        request.headers = (request.headers || {});
        request.data = (request.data || {});
        request.params = (request.params || {});
        request.apiName = (request.apiName || this._defaultApiName);

        this._interpolateUrl(request);

        this._addContentType(request);

        this._addAuthToken(request);

        return this.http.request(
            new Request({
                method: request.method,
                url: this._buildApiUrl(request),
                headers: request.headers,
                search: this._buildUrlSearchParams(request.params),
                body: JSON.stringify(request.data, dateReplacer)
            })
        ).catch(error => {
            let httpError = this._unwrapAndCastHttpResponse<HttpError>(error);
            this.notificationsService.error(httpError.title, httpError.message);
            return Observable.throw(error);
        }).map((res: Response) => this._unwrapAndCastHttpResponse<T>(res));
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
    public get<T>(url: string, apiName?: string, params?: any): Observable<T> {
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
    public post<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
        return this.request<T>({
            method: RequestMethod.Post,
            url: url,
            data: data,
            params: params,
            apiName: apiName
        });
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
    public put<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
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
    public delete<T>(url: string, apiName?: string, params?: any): Observable<T> {
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
    public patch<T>(url: string, data: any, apiName?: string, params?: any): Observable<T> {
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
     * the interpolated values will be removed from the requestOptions object
     *
     * the placeholders in the url must begin with a letter an can then contain any alphanumeric characters and also dashes
     *
     * /resource/:id --> /resource/1
     *
     * @param requestOptions
     * @returns returns the requestOptions object with the updated url
     */
    private _interpolateUrl(requestOptions: RequestOptions) {
        requestOptions.url = requestOptions.url.replace(
            /:([a-zA-Z]+[\w-]*)/g,
            ($0, token) => {
                if (requestOptions.params.hasOwnProperty(token)) return this._extractValue(requestOptions.params, token);
                return '';
            }
        );
        // cleanup double slashes
        requestOptions.url = this._removeRepeatedSlashes(requestOptions.url);
        // cleanup unnecessary slashes at the end
        requestOptions.url = requestOptions.url.replace(/\/+$/g, '');
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
    private _extractValue(obj: Object, key: string): any {
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
    private _addContentType(request: RequestOptions) {
        if (request.method !== RequestMethod.Get && request.method !== RequestMethod.Delete) {
            request.headers['Content-Type'] = 'application/json ; charset=UTF-8';
        }
        return request;
    }

    /**
     * builds the query string with the angular 2 URLSearchParams class
     *
     * @param params object containing the params
     * @returns {URLSearchParams} all search params
     */
    private _buildUrlSearchParams(params: {}|any) {
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
    private _addAuthToken(request: RequestOptions) {
        let api = this._getApiFromConfig(request.apiName);
        if (api.authToken === true) {
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem(this.config.get('locStorage.tokenLocation'));
        }
    }

    /**
     * unwraps an _http response and returns it as T
     * if no response is present then it returns null
     *
     * @param response
     * @returns http response as T
     */
    private _unwrapAndCastHttpResponse<T>(response: Response): T {
        let responseStr = response.text();
        if (responseStr.length <= 0) return null;
        return JSON.parse(responseStr, dateReviver) as T;
    }

    /**
     * Builds the url for a request by combining the apis base and the request url
     *
     * @param request
     * @returns {string} Request url
     */
    private _buildApiUrl(request: RequestOptions): string {
        let api = this._getApiFromConfig(request.apiName);
        return this._removeRepeatedSlashes(`${api['apiBase']}/${request.url}`); // concat Url and remove double slashes
    }

    /**
     * gets the api config object from the Config service and returns it
     *
     * @param apiName
     * @returns {any} api object from the config
     */
    private _getApiFromConfig(apiName: string) {
        let name = (this._apiNames.indexOf(apiName) >= 0) ? apiName : this._defaultApiName;
        return this.config.get('api.apis')
            .find(api => api.name === name);
    }

    /**
     * removes double slashes in the url except after the protocol
     *
     * @param str url
     * @returns {string} formatted url
     */
    private _removeRepeatedSlashes(str: string): string {
        return str.replace(/([^:])\/{2,}/g, (match, prefix) => prefix + '/');
    }
}

