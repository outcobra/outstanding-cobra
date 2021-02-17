import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ManageComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ManageRoutingModule {
}
