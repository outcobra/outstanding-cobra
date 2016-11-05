import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    private date: Date = new Date(2016, 10, 12);

  constructor() { }

  ngOnInit() {
  }

}
