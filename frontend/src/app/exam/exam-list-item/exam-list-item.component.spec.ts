import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamListItemComponent} from './exam-list-item.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {MockExamService} from '../../core/mock/exam/mock-exam.service';

describe('ExamListItemComponent', () => {
    let component: ExamListItemComponent;
    let fixture: ComponentFixture<ExamListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ExamListItemComponent
            ],
            imports: [
                TestModule,
                OCUiModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamListItemComponent);
        component = fixture.componentInstance;
        component.exam = MockExamService.EXAM_1_OF_SUBJECT_1;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
