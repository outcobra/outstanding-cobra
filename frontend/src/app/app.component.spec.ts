/* tslint:disable:no-unused-variable */
import { TestBed, waitForAsync } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TestModule} from './core/mock/test.module';
import {OCUiModule} from './oc-ui/oc-ui.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('App: Frontend', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                TestModule,
                OCUiModule
            ]
        });
    });

    it('should create the app', waitForAsync(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
