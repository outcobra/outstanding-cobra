import { Component } from '@angular/core';
import { DefaultAuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public authService: DefaultAuthService) {
  }
}
