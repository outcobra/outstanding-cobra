import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamListItemComponent} from './exam-list-item.component';

describe('ExamListItemComponent', () => {
    let component: ExamListItemComponent;
    let fixture: ComponentFixture<ExamListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExamListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
