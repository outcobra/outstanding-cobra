export class Util {

    public static clone(obj: any): Object {
        return JSON.parse(JSON.stringify(obj));
    }

    static keys(obj: Object) {
        return Object.keys(obj);
    }
}
