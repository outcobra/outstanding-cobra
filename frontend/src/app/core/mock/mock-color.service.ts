import {Injectable} from '@angular/core';
import {ColorService} from '../../shared/services/color.service';
import {Observable} from 'rxjs';
import {Color} from '../../shared/model/Color';

@Injectable()
export class MockColorService extends ColorService {
    public static readonly colors = [
        {
            name: "grey",
            hex: "515151",
            index: 1
        },
        {
            name: "blue",
            hex: "0000ff",
            index: 2
        },
        {
            name: "red",
            hex: "ff0000",
            index: 3
        }
    ];

    public getColors(): Observable<Color[]> {
        return Observable.of(MockColorService.colors);
    }
}
