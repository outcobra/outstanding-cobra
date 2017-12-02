import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';
import {SemesterMarkResolver} from './service/semester-mark-resolver.service';
import {MarkCreateUpdateComponent} from './mark-create-update/mark-create-update.component';
import {MarkResolver} from './service/mark-resolver.service';
import {MarkGroupResolver} from './service/mark-group-resolver.service';
import {MarkGroupCreateUpdateComponent} from './mark-group-create-update/mark-group-create-update.component';
import {SubjectMarkGroupResolver} from 'app/mark/service/subject-mark-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
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
                                path: 'add',
                                component: MarkGroupCreateUpdateComponent,
                                resolve: {
                                    subjectMarkGroup: SubjectMarkGroupResolver
                                },
                                data: {
                                    isEdit: false
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
                                    isEdit: true
                                }
                            },
                            {
                                path: ':groupId',
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
                                            isEdit: true
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
