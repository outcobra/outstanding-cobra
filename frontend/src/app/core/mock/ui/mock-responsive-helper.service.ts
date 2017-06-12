import {Injectable} from '@angular/core';
import {ResponsiveHelperService} from '../../services/ui/responsive-helper.service';
import {Orientation} from '../../services/ui/orientation';

@Injectable()
export class MockResponsiveHelperService extends ResponsiveHelperService {

    public getCurrentOrientation(): Orientation {
        return Orientation.LANDSCAPE;
    }
}
