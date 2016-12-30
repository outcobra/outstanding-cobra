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
            .forEach((item) => {
                tmp = item.split("=");
                if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

    /**
     * returns an array containing subarrays from the input array with the length
     * does not mutate the input array
     * length: 2
     * ["abc", "def", "hij", "klm", "nop"] => [["abc", "def"], ["hij", "klm"], ["nop"]]
     *
     * @param array to split
     * @param length of the subarrays
     * @returns {Array}
     */
    static split<T>(array: Array<T>, length: number): Array<Array<T>> {
        let out = [];
        let copy = Util.clone(array); // copy the array to not mutate the input
        while (copy.length > 0) {
            out.push(copy.splice(0, length));
        }
        return out;
    }

    /**
     * clones the given object and returns the copy
     *
     * @param obj
     * @returns {any}
     */
    static clone<T>(obj: T): T{
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * returns the time in milliseconds since the 01.01.1970
     * @returns {number}
     */
    static getMillis(): number {
        return new Date().getTime();
    }
}
