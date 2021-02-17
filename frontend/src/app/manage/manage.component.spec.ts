/* tslint:disable:no-unused-variable */
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { TestModule } from '../core/mock/test.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { ManageComponent } from './manage.component';
import { ManageService } from './service/manage.service';

describe('ManagerComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageComponent
      ],
      imports: [
        TestModule,
        OCUiModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide data', inject([ManageService], (manageService: ManageService) => {
    manageService.getManageData()
      .subscribe(data => {
        expect(data).toBeTruthy();
      });
  }));
});
