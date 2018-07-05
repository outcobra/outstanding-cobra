import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';
import {SchoolYearResolverService} from './service/school-year-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'class',
                component: SchoolClassComponent
            },
            {
                path: 'class/:schoolClassId/schoolyear',
                component: SchoolYearSemesterComponent,
                resolve: {
                    schoolYears: SchoolYearResolverService
                }
            },
            {
                path: 'schoolyear',
                component: SchoolYearSemesterComponent,
                resolve: {
                    schoolYears: SchoolYearResolverService
                }
            },
            {
                path: 'subject',
                component: SubjectComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManageRoutingModule {
}
