/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {TestModule} from '../../../core/mock/test.module';
import {MdDialog, MdDialogModule, OverlayContainer} from '@angular/material';
import {SpyLocation} from '@angular/common/testing';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    let overlayContainerElement: HTMLElement;
    let mockLocation: SpyLocation;
    let mdDialog: MdDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmDialogComponent
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
        }).compileComponents();
    }));

    beforeEach(inject([MdDialog, Location], (d: MdDialog, l) => {
        mdDialog = d;
        mockLocation = l as SpyLocation;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
