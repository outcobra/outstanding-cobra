import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkGroupCreateUpdateComponent} from './mark-group-create-update.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MockMarkService} from '../../core/mock/mark/mock-mark.service';
import {MarkValueComponent} from '../mark-value/mark-value.component';

describe('MarkGroupCreateUpdateComponent', () => {
    let component: MarkGroupCreateUpdateComponent;
    let fixture: ComponentFixture<MarkGroupCreateUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkGroupCreateUpdateComponent,
                MarkValueComponent
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
                            subjectMarkGroup: MockMarkService.SUBJECT_MARK_GROUP_1,
                            isEdit: false
                        }),
                        paramMap: Observable.of(convertToParamMap({
                            semesterId: MockMarkService.SEMESTER_MARK_1.id
                        }))
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkGroupCreateUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
