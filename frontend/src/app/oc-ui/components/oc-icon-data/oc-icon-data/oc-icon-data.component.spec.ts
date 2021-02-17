import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {OCIconDataComponent} from './oc-icon-data.component';
import {TestModule} from '../../../../core/mock/test.module';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('OCIconDataComponent', () => {
    let component: OCIconDataComponent;
    let fixture: ComponentFixture<OCIconDataComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                OCIconDataComponent
            ],
            imports: [
                TestModule,
                FlexLayoutModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OCIconDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
