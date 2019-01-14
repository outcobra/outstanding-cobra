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
import {SemesterResolverService} from './service/semester-resolver.service';
import {SubjectResolverService} from './service/subject/subject-resolver.service';
import {PipeModule} from '../shared/pipe.module';
import {SchoolClassCreateUpdateComponent} from './create-update/school-class-create-update/school-class-create-update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SchoolYearCreateUpdateComponent} from './create-update/school-year-create-update-component/school-year-create-update.component';

@NgModule({
    declarations: [
        SchoolClassComponent,
        SchoolClassCreateUpdateComponent,
        SchoolYearSemesterComponent,
        SchoolYearCreateUpdateComponent,
        SubjectComponent
    ],
    imports: [
        ManageRoutingModule,
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        OCUiModule,
        OCMaterialModule,
        PipeModule
    ],
    providers: [
        ManageService,
        SchoolYearResolverService,
        SchoolClassResolverService,
        SemesterResolverService,
        SubjectResolverService
    ]
})
export class ManageModule {
}
