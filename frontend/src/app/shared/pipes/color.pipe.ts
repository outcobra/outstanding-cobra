import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (parseInt(value, 16) > parseInt('FFFFFF', 16)) {
      throw new Error(`not a valid color: ${value}`);
    }
    return `#${value}`;
  }
}
