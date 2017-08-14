import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
    name: 'markValue'
})
export class MarkValuePipe implements PipeTransform {
    constructor(private _numberPipe: DecimalPipe){}

    transform(value: any, args?: any): any {
        return this._numberPipe.transform(value, '1.0-2');
    }
}
