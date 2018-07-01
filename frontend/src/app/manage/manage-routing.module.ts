import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'class',
                component: SchoolClassComponent
            },
            {
                path: 'class/:id/schoolyear',
                component: SchoolYearSemesterComponent
            },
            {
                path: 'schoolyear',
                component: SchoolYearSemesterComponent
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
