import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {MarkValueComponent} from './mark-value.component';
import {TestModule} from '../../core/mock/test.module';
import {MockMarkService} from '../../core/mock/mark/mock-mark.service';

describe('MarkValueComponent', () => {
    let component: MarkValueComponent;
    let fixture: ComponentFixture<MarkValueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkValueComponent
            ],
            imports: [
                TestModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkValueComponent);
        component = fixture.componentInstance;
        component.mark = MockMarkService.SUBJET_MARK_GROUP_1.markValues[0];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
