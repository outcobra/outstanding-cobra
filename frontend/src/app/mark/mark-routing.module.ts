import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';
import {SemesterMarkResolver} from './service/semester-mark-resolver.service';
import {MarkCreateUpdateComponent} from './mark-create-update/mark-create-update.component';
import {MarkResolver} from './service/mark-resolver.service';
import {MarkGroupResolver} from './service/mark-group-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'mark',
                canActivate: [AuthGuard],
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
                        path: 'semester/:semesterId/subject/:subjectId',
                        children: [
                            {
                                path: 'add',
                                component: MarkCreateUpdateComponent,
                                data: {
                                    isEdit: false
                                }
                            },
                            {
                                path: 'edit/:markId',
                                component: MarkCreateUpdateComponent,
                                resolve: {
                                    mark: MarkResolver
                                },
                                data: {
                                    isEdit: true
                                }
                            },
                            {
                                path: 'group/:groupId',
                                children: [
                                    {
                                        path: 'add',
                                        component: MarkCreateUpdateComponent,
                                        data: {
                                            isEdit: false
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
                                            isEdit: false
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
