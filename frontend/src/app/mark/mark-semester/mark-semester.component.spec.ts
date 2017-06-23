import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkSemesterComponent} from './mark-semester.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MockMarkService} from '../../core/mock/mark/mock-mark.service';
import {MarkValueComponent} from '../mark-value/mark-value.component';

describe('MarkSemesterComponent', () => {
    let component: MarkSemesterComponent;
    let fixture: ComponentFixture<MarkSemesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkSemesterComponent,
                MarkValueComponent
            ],
            imports: [
                TestModule,
                OCUiModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: Observable.of({
                            semesterMark: MockMarkService.SEMESTER_MARK_1
                        })
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkSemesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
