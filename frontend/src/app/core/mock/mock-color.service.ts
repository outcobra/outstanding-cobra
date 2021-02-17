import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { ColorDto } from '../model/color.dto';
import { ColorService } from '../services/color.service';

@Injectable()
export class MockColorService extends ColorService {
  public static readonly colors = [
    {
      name: 'grey',
      hex: '515151',
      index: 1
    },
    {
      name: 'blue',
      hex: '0000ff',
      index: 2
    },
    {
      name: 'red',
      hex: 'ff0000',
      index: 3
    }
  ];

  public getColors(): Observable<ColorDto[]> {
    return observableOf(MockColorService.colors);
  }
}
