
import {of as observableOf, Observable} from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MarkCreateUpdateComponent} from './mark-create-update.component';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {TestModule} from '../../core/mock/test.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {MockMarkService} from 'app/core/mock/mark/mock-mark.service';

describe('MarkCreateUpdateComponent', () => {
    let component: MarkCreateUpdateComponent;
    let fixture: ComponentFixture<MarkCreateUpdateComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkCreateUpdateComponent
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

                        }),
                        params: observableOf({
                            semesterId: MockMarkService.SEMESTER_MARK_1.id
                        }),
                        queryParams: observableOf({})
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkCreateUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
