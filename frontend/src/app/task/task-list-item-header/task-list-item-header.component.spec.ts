import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListItemHeaderComponent} from './task-list-item-header.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {MockTaskService} from '../../core/mock/task/mock-task.service';

describe('TaskListItemHeaderComponent', () => {
    let component: TaskListItemHeaderComponent;
    let fixture: ComponentFixture<TaskListItemHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskListItemHeaderComponent
            ],
            imports: [
                TestModule,
                OCUiModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListItemHeaderComponent);
        component = fixture.componentInstance;
        component.task = MockTaskService.TASK1;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
