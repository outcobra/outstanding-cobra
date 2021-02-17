import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {TestModule} from '../core/mock/test.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                OCUiModule,
                RouterTestingModule
            ],
            declarations: [
                AuthComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
