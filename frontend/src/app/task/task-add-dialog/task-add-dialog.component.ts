import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'task-add-dialog',
  templateUrl: './task-add-dialog.component.html',
  styleUrls: ['./task-add-dialog.component.scss']
})
export class TaskAddDialogComponent implements OnInit {
    private taskAddForm: FormGroup;

  constructor(public dialogRef: MdDialogRef<TaskAddDialogComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.taskAddForm = this.formBuilder.group({

      });
  }

}
