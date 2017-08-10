import {dateReplacer} from '../http/http-util';

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
    public static getUrlParam(paramName: string) {
        let result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split('&')
            .forEach((item) => {
                tmp = item.split('=');
                if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

    /**
     * moves the given element to the first position in the array
     * if the element is not present it will be added in the front
     *
     * @param array
     * @param element
     * @returns {Array<T>}
     */
    public static moveToFirst<T>(array: Array<T>, element: T): Array<T> {
        Util.removeItem(array, element);
        array.unshift(element);
        return array;
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
    public static split<T>(array: Array<T>, length: number): Array<Array<T>> {
        let out = [];
        let copy = Util.cloneArray<T>(array); // copy the array to not mutate the input
        while (copy.length > 0) {
            out.push(copy.splice(0, length));
        }
        return out;
    }

    /**
     * removes the first element in the array that matches the predicate
     * if the element is not found the unchanged array is returned
     *
     * @param array
     * @param findPredicate
     * @returns {any}
     */
    public static removeFirstMatch<T>(array: Array<T>, findPredicate: Predicate<T>): Array<T> {
        let index = array.findIndex(t => findPredicate(t));
        if (!index && index != 0) {
            return array;
        }
        return array.splice(index, 1)
    }

    /**
     * removes the item from the array and returns it
     * if the item does not exists in the array the array will be return without removing anything
     *
     * @param array
     * @param item
     * @returns {T[]}
     */
    public static removeItem<T>(array: Array<T>, item: T): Array<T> {
        let itemIndex = array.indexOf(item);
        if (itemIndex < 0) {
            return array;
        }
        array.splice(itemIndex, 1);
        return array;
    }

    /**
     * removes all elements in the items array from the first given array
     *
     * @param {Array<T>} array
     * @param {Array<T>} items
     * @returns {Array<T>}
     */
    public static removeItems<T>(array: Array<T>, items: Array<T>): Array<T> {
        items.forEach(item => Util.removeItem(array, item));
        return array;
    }

    /**
     * clones the given object and returns the copy
     *
     * @param obj
     * @returns {any}
     */
    public static clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj, dateReplacer)) as T;
    }

    /**
     *
     */
    public static cloneArray<T>(array: Array<T>): Array<T> {
        return array.slice(0);
    }

    /**
     * returns the time in milliseconds since the 01.01.1970
     * @returns {number}
     */
    public static getMillis(): number {
        return new Date().getTime();
    }

    public static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}
