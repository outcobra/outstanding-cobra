import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {InfoDialogComponent} from './info-dialog.component';
import {SpyLocation} from '@angular/common/testing';
import {MdDialog, MdDialogModule, OverlayContainer} from '@angular/material';
import {TestModule} from '../../../core/mock/test.module';

describe('InfoDialogComponent', () => {
    let component: InfoDialogComponent;
    let fixture: ComponentFixture<InfoDialogComponent>;

    let overlayContainerElement: HTMLElement;
    let mockLocation: SpyLocation;
    let mdDialog: MdDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InfoDialogComponent
            ],
            imports: [
                TestModule,
                MdDialogModule
            ],
            providers: [
                {
                    provide: OverlayContainer, useFactory: () => {
                    overlayContainerElement = document.createElement('div');
                    return {getContainerElement: () => overlayContainerElement};
                }
                },
                {provide: Location, useClass: SpyLocation}
            ],
        })
            .compileComponents();
    }));

    beforeEach(inject([MdDialog, Location], (d: MdDialog, l) => {
        mdDialog = d;
        mockLocation = l as SpyLocation;
    }));
});
