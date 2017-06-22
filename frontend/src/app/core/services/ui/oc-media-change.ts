import {MediaChange} from '@angular/flex-layout';
import {Orientation} from './orientation';

export interface OCMediaChange {
    mobile: boolean,
    width: number,
    orientation: Orientation,
    originalChange: MediaChange
}
