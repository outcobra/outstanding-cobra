import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markValue'
})
export class MarkValuePipe implements PipeTransform {
  constructor(private _numberPipe: DecimalPipe) {
  }

  transform(value: any, args?: any): any {
    if (isNaN(value)) {
      return '';
    }
    return this._numberPipe.transform(value, '1.0-2');
  }
}
