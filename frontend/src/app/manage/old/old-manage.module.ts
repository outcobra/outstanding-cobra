import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from './manage.component';
import {ManageRoutingModule} from './manage-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OCMaterialModule} from '../../oc-material.module';
import {PipeModule} from '../../shared/pipe.module';

@NgModule({
    imports: [
        CommonModule,
        ManageRoutingModule,
        OCMaterialModule,
        FlexLayoutModule,
        SharedModule,
        PipeModule
    ],
    declarations: [
        ManageComponent
    ]
})
export class OldManageModule {
}
