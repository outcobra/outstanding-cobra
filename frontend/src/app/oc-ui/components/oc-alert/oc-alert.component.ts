import { Component, HostBinding, Input } from '@angular/core';

export type OCAlertType = 'oc-error' | 'oc-warning' | 'oc-success' | 'oc-info';

@Component({
  selector: 'oc-alert',
  templateUrl: './oc-alert.component.html',
  styleUrls: ['./oc-alert.component.scss']
})
export class OCAlertComponent {
  @HostBinding('class')
  @Input() type: OCAlertType;
}
