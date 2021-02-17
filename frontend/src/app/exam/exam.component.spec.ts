
import {of as observableOf, Observable} from 'rxjs';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ExamComponent} from './exam.component';
import {TestModule} from '../core/mock/test.module';
import {ReactiveFormsModule} from '@angular/forms';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {ExamListItemComponent} from './exam-list-item/exam-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

describe('ExamComponent', () => {
    let component: ExamComponent;
    let fixture: ComponentFixture<ExamComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ExamComponent,
                ExamListItemComponent
            ],
            imports: [
                TestModule,
                OCUiModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: observableOf({
                            schoolClassSubjects: [],
                            allExams: [],
                            activeExams: []
                        })
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
