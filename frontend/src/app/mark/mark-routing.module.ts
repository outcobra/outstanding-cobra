import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectMarkGroupResolver } from 'app/mark/service/subject-mark-resolver.service';
import { MarkCreateUpdateComponent } from './mark-create-update/mark-create-update.component';
import { MarkGroupCreateUpdateComponent } from './mark-group-create-update/mark-group-create-update.component';
import { MarkSemesterComponent } from './mark-semester/mark-semester.component';
import { MarkComponent } from './mark.component';
import { MarkGroupResolver } from './service/mark-group-resolver.service';
import { MarkResolver } from './service/mark-resolver.service';
import { SemesterMarkResolver } from './service/semester-mark-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: {
          animation: 'mark'
        },
        children: [
          {
            path: '',
            component: MarkComponent,
            children: [
              {
                path: 'semester/:semesterId',
                component: MarkSemesterComponent,
                resolve: {
                  semesterMark: SemesterMarkResolver
                }
              }
            ]
          },
          {
            path: 'semester/:semesterId/subject/:subjectId/group',
            children: [
              {
                path: 'new',
                component: MarkGroupCreateUpdateComponent,
                resolve: {
                  subjectMarkGroup: SubjectMarkGroupResolver
                },
                data: {
                  isEdit: false,
                  animation: 'markGroupCreateUpdate'
                }
              },
              {
                path: 'edit/:groupId',
                component: MarkGroupCreateUpdateComponent,
                resolve: {
                  subjectMarkGroup: SubjectMarkGroupResolver,
                  markGroup: MarkGroupResolver
                },
                data: {
                  isEdit: true,
                  animation: 'markGroupCreateUpdate'
                }
              },
              {
                path: ':groupId',
                children: [
                  {
                    path: 'new',
                    component: MarkCreateUpdateComponent,
                    data: {
                      isEdit: false,
                      animation: 'markCreateUpdate'
                    }
                  },
                  {
                    path: 'edit/:markId',
                    component: MarkCreateUpdateComponent,
                    resolve: {
                      mark: MarkResolver,
                      parent: MarkGroupResolver
                    },
                    data: {
                      isEdit: true,
                      animation: 'markCreateUpdate'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MarkRoutingModule {
}
