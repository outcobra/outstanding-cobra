import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamCreateUpdateDialog} from './exam-create-update-dialog.component';

describe('ExamCreateUpdateDialog', () => {
    let component: ExamCreateUpdateDialog;
    let fixture: ComponentFixture<ExamCreateUpdateDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExamCreateUpdateDialog]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamCreateUpdateDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
