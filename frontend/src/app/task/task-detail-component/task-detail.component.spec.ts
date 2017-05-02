/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskDetailComponent} from './task-detail.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('TaskDetailComponent', () => {
    let component: TaskDetailComponent;
    let fixture: ComponentFixture<TaskDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskDetailComponent
            ],
            imports: [
                TestModule,
                FormsModule,
                RouterTestingModule,
                OCUiModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
