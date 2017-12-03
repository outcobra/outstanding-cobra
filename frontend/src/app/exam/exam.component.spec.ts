/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExamComponent} from './exam.component';
import {TestModule} from '../core/mock/test.module';
import {ReactiveFormsModule} from '@angular/forms';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {ExamListItemComponent} from './exam-list-item/exam-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

describe('ExamComponent', () => {
    let component: ExamComponent;
    let fixture: ComponentFixture<ExamComponent>;

    beforeEach(async(() => {
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
                        data: Observable.of({
                            taskFilter: {schoolClassSubjects: []},
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
