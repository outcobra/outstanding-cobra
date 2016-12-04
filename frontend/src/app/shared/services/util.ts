/**
 * not really sure what this is currently
 */
export class Util {

    public static clone(obj: any): Object {
        return JSON.parse(JSON.stringify(obj));
    }

    static keys(obj: Object) {
        return Object.keys(obj);
    }

    static getUrlParam(paramName: string) {
        let result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
}
