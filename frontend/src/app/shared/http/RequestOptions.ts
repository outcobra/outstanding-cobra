import {RequestMethod} from "@angular/http";

export interface RequestOptions {
    method: RequestMethod,
    url: string,
    headers?:  any,
    data?: any,
    params: any,
    apiName: string
}
