import { Directive } from '@angular/core';

@Directive({
  selector: 'oc-divider',
  host: {
    '[class.oc-divider]': 'true'
  }
})
export class OCDividerDirective {
}
