/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskComponent} from './task.component';
import {TestModule} from '../core/mock/test.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TaskListItemComponent} from './task-list-item/task-list-item.component';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskComponent,
                TaskListItemComponent
            ],
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterTestingModule,
                OCUiModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
