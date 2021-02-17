import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestModule } from '../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui/oc-ui.module';
import { GoogleLoginComponent } from '../google-login/google-login.component';

import { LoginSignUpComponent } from './login-signup.component';

describe('LoginComponent', () => {
  let component: LoginSignUpComponent;
  let fixture: ComponentFixture<LoginSignUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginSignUpComponent,
        GoogleLoginComponent
      ],
      imports: [
        TestModule,
        OCUiModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
