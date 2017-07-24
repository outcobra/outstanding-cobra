import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamCreateUpdateDialogComponent} from './exam-create-update-dialog.component';

describe('ExamCreateUpdateDialogComponent', () => {
    let component: ExamCreateUpdateDialogComponent;
    let fixture: ComponentFixture<ExamCreateUpdateDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExamCreateUpdateDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamCreateUpdateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
