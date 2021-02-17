import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MarkWeightUpdaterComponent} from './mark-weight-updater.component';
import {TestModule} from '../../core/mock/test.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MockMarkService} from '../../core/mock/mark/mock-mark.service';

describe('MarkWeightUpdaterComponent', () => {
    let component: MarkWeightUpdaterComponent;
    let fixture: ComponentFixture<MarkWeightUpdaterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkWeightUpdaterComponent
            ],
            imports: [
                TestModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkWeightUpdaterComponent);
        component = fixture.componentInstance;
        component.markGroup = MockMarkService.SUBJECT_MARK_GROUP_1;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
