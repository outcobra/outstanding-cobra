import { Injectable } from '@angular/core';
import { Orientation } from '../../services/ui/orientation';
import { ResponsiveHelperService } from '../../services/ui/responsive-helper.service';

@Injectable()
export class MockResponsiveHelperService extends ResponsiveHelperService {

  public getCurrentOrientation(): Orientation {
    return Orientation.LANDSCAPE;
  }
}
