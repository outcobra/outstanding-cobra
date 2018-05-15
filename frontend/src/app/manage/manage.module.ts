import {NgModule} from '@angular/core';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';
import {ManageRoutingModule} from './manage-routing.module';

@NgModule({
    declarations: [
        SchoolClassComponent,
        SchoolYearSemesterComponent,
        SubjectComponent
    ],
    imports: [
        ManageRoutingModule
    ]
})
export class ManageModule {
}
