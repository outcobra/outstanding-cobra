import {RequestMethod} from "@angular/http";

/**
 * RequestOptions interface that defines all possible properties of a request in the {HttpInterceptor}
 */
export interface RequestOptions {
    method: RequestMethod,
    url: string,
    headers?:  any,
    data?: any,
    params: any,
    apiName: string
}
