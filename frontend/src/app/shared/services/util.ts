/**
 * Util class
 * contains everything that does not fit in another service
 */
export class Util {

    /**
     * searches for the given parameter in the URL and returns the value
     * if it isn't present it returns null
     *
     * @param paramName
     * @returns {null}
     */
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
