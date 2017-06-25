import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {ExamComponent} from './exam.component';

@NgModule({
              imports: [
                  RouterModule.forChild([{
                                            path: 'exam',
                                            component: ExamComponent,
                                            canActivate: [AuthGuard]
                                        }]
                  )],
              exports: [
                  RouterModule
              ]
          })

export class ExamRoutingModule {
}
