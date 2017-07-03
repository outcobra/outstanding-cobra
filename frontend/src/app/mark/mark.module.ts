import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';
import {MarkRoutingModule} from './mark-routing.module';
import {CoreModule} from '../core/core.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {MarkService} from './service/mark.service';
import {SemesterMarkResolver} from './service/semester-mark-resolver.service';
import {MarkValueComponent} from './mark-value/mark-value.component';
import {MarkCreateUpdateComponent} from './mark-create-update/mark-create-update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../core/pipe.module';
import {MarkGroupCreateUpdateComponent} from './mark-group-create-update/mark-group-create-update.component';
import {SubjectMarkGroupResolver} from './service/subject-mark-resolver.service';
import {MarkGroupResolver} from './service/mark-group-resolver.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        ReactiveFormsModule,
        MarkRoutingModule,
        CoreModule,
        OCMaterialModule,
        OCUiModule,
        FlexLayoutModule,
        PipeModule
    ],
    declarations: [
        MarkComponent,
        MarkSemesterComponent,
        MarkValueComponent,
        MarkCreateUpdateComponent,
        MarkGroupCreateUpdateComponent
    ],
    providers: [
        MarkService,
        SemesterMarkResolver,
        SubjectMarkGroupResolver,
        MarkGroupResolver
    ]
})
export class MarkModule {
}
