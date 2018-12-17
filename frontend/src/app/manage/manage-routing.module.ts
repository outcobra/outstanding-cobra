import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';
import {SchoolYearResolverService} from './service/school-year-resolver.service';
import {SchoolClassResolverService} from './service/school-class-resolver.service';
import {SemesterResolverService} from './service/semester-resolver.service';
import {SubjectResolverService} from './service/subject/subject-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'schoolClass',
                component: SchoolClassComponent
            },
            {
                path: 'schoolyear',
                component: SchoolYearSemesterComponent,
                resolve: {
                    schoolYears: SchoolYearResolverService
                }
            },
            {
                path: 'schoolyear/schoolClass/:schoolClassId',
                component: SchoolYearSemesterComponent,
                resolve: {
                    schoolYears: SchoolYearResolverService,
                    class: SchoolClassResolverService
                }
            },
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
                    subjects: SubjectResolverService
                }
            },
            {
                path: 'subject/schoolClass/:schoolClassId/semester/:semesterId',
                component: SubjectComponent,
                resolve: {
                    class: SchoolClassResolverService,
                    semester: SemesterResolverService,
                    subjects: SubjectResolverService
                }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManageRoutingModule {
}
