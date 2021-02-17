import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMarkService } from 'app/core/mock/mark/mock-mark.service';
import { of as observableOf } from 'rxjs';
import { TestModule } from '../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui/oc-ui.module';

import { MarkCreateUpdateComponent } from './mark-create-update.component';

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
            data: observableOf({}),
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
