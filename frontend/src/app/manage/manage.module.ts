import {NgModule} from '@angular/core';
import {SchoolClassComponent} from './school-class/school-class.component';
import {SchoolYearSemesterComponent} from './school-year-semester/school-year-semester.component';
import {SubjectComponent} from './subject/subject.component';
import {ManageRoutingModule} from './manage-routing.module';
import {OCMaterialModule} from '../oc-material.module';
import {CommonModule} from '@angular/common';
import {ManageService} from './service/manage.service';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SchoolYearResolverService} from './service/school-year-resolver.service';
import {SchoolClassResolverService} from './service/school-class-resolver.service';
import {SemesterService} from './service/semester.service';
import {SemesterResolverService} from './service/semester-resolver.service';
import {SubjectResolverService} from './service/subject/subject-resolver.service';
import {SubjectService} from './service/subject.service';
import {SchoolClassService} from './service/school-class.service';
import {SchoolYearService} from './service/school-year.service';
import {PipeModule} from '../shared/pipe.module';

@NgModule({
    declarations: [
        SchoolClassComponent,
        SchoolYearSemesterComponent,
        SubjectComponent
    ],
    imports: [
        ManageRoutingModule,
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        OCUiModule,
        OCMaterialModule,
        PipeModule
    ],
    providers: [
        ManageService,
        SchoolClassService,
        SchoolYearService,
        SemesterService,
        SubjectService,
        SchoolYearResolverService,
        SchoolClassResolverService,
        SemesterResolverService,
        SubjectResolverService
    ]
})
export class ManageModule {
    constructor(semesterService: SemesterService) {
        console.log(semesterService);
    }

}
