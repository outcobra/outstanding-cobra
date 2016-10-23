import {Injectable} from "@angular/core";
import {
    Http, ConnectionBackend, Request, RequestOptions, Response,
    RequestMethod, URLSearchParams
} from "@angular/http";
import {Observable} from "rxjs";
import {NotificationsService} from "angular2-notifications";
import "rxjs/add/operator/map";
import * as _ from "underscore";

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _notificationsService: NotificationsService) {
        super(backend, defaultOptions);
    }

    request(request: any): Observable<Response> {
        request.method = (request.method || RequestMethod.Get);
        request.url = (request.url || "");
        request.headers = (request.headers || {});
        request.data = (request.data || {});
        request.params = (request.params || {});

        this.interpolateUrl(request);

        this.addContentType(request);

        return super.request(
            new Request({
                method: request.method,
                url: request.url,
                headers: request.headers,
                search: this.buildUrlSearchParams(request.params),
                body: JSON.stringify(request.data)

            })
        ).catch(error => {
            this._notificationsService.error('Error!', 'Requested resource could not be found.');
            return Observable.empty();
        }).map(this.unwrapHttpResponse);
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////// Http Functions //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    /**
     * performs a simple get request
     *
     * @param url
     * @param params
     * @returns {Observable<Response>}
     */
    get(url: string, params?: any): Observable<Response> {
        return this.request({
            method: RequestMethod.Get,
            url: url,
            params: params
        });
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.request({
            method: RequestMethod.Post,
            url: url,
            data: data,
            params: params
        })
    }


    put(url: string, data: any, params?: any): Observable<Response> {
        return this.request({
            method: RequestMethod.Put,
            url: url,
            data: data,
            params: params
        });
    }

    delete(url: string, params?: any): Observable<Response> {
        return this.request({
            method: RequestMethod.Delete,
            url: url,
            params: params
        });
    }

    patch(url: string, data: any, params?: any): Observable<Response> {
        return this.request({
            method: RequestMethod.Patch,
            url: url,
            params: params
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
        requestOptions.url = requestOptions.url.replace(/\/{2,}/g, "/");
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

    private unwrapHttpResponse(response) {
        return response.json();
    }
}

