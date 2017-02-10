// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

interface Array<T> {
    find(predicate: (search: T) => boolean): T;
}

type Predicate<T> = (arg: T) => boolean;
