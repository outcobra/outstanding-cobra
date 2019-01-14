import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';
import {SchoolYearResolverService} from './service/school-year-resolver.service';
import {SchoolClassResolverService} from './service/school-class-resolver.service';
import {SemesterResolverService} from './service/semester-resolver.service';
import {SubjectResolverService} from './service/subject/subject-resolver.service';
import {SchoolClassCreateUpdateComponent} from './create-update/school-class-create-update/school-class-create-update.component';
import {SchoolClassByIdResolverService} from '../core/services/manage/resolver/school-class-by-id-resolver.service';
import {SchoolYearCreateUpdateComponent} from './create-update/school-year-create-update-component/school-year-create-update.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            // region schoolClass
            // display
            {
                path: 'schoolClass',
                children: [
                    {
                        path: '',
                        component: SchoolClassComponent
                    },
                    {
                        path: 'new',
                        component: SchoolClassCreateUpdateComponent
                    },
                    {
                        path: 'update/:schoolClassId',
                        component: SchoolClassCreateUpdateComponent,
                        resolve: {
                            schoolClass: SchoolClassByIdResolverService
                        }
                    },
                ]
            },
            // endregion
            // region schoolYear & semester
            {
                path: 'schoolYear',
                children: [
                    {
                        path: '',
                        component: SchoolYearSemesterComponent,
                        resolve: {
                            schoolYears: SchoolYearResolverService
                        }
                    },
                    {
                        path: 'new',
                        component: SchoolYearCreateUpdateComponent
                    },
                    {
                        path: 'update/:schoolYearId',
                        component: SchoolYearCreateUpdateComponent,
                        resolve: {
                            schoolYear: SchoolYearResolverService
                        }
                    },
                    {
                        path: ':schoolYearId',
                        resolve: {
                            schoolYears: SchoolYearResolverService
                        },
                        children: [
                            {
                                path: '',
                                component: SchoolYearSemesterComponent,
                            },
                            {
                                path: 'schoolClass/:schoolClassId',
                                component: SchoolYearSemesterComponent,
                                resolve: {
                                    schoolClass: SchoolClassResolverService
                                }
                            }
                        ]
                    },
                    {
                        path: 'schoolClass/:schoolClassId',
                        resolve: {
                            schoolClass: SchoolClassResolverService
                        },
                        children: [
                            {
                                path: '',
                                component: SchoolYearSemesterComponent,
                                resolve: {
                                    schoolYears: SchoolYearResolverService,
                                }
                            },
                            {
                                path: 'new',
                                component: SchoolYearCreateUpdateComponent
                            }
                        ]
                    }
                ]
            },
            // endregion
            // region subject
            {
                path: 'subject',
                component: SubjectComponent,
                resolve: {
                    subjects: SubjectResolverService
                }
            },
            {
                path: 'subject/semester/:semesterId',
                component: SubjectComponent,
                resolve: {
                    semester: SemesterResolverService,
                    subjects: SubjectResolverService
                }
            },
            {
                path: 'subject/schoolClass/:schoolClassId',
                component: SubjectComponent,
                resolve: {
                    schoolClass: SchoolClassResolverService,
                    subjects: SubjectResolverService
                }
            },
            {
                path: 'subject/schoolClass/:schoolClassId/semester/:semesterId',
                component: SubjectComponent,
                resolve: {
                    schoolClass: SchoolClassResolverService,
                    semester: SemesterResolverService,
                    subjects: SubjectResolverService
                }
            }
            // endregion
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManageRoutingModule {
}
