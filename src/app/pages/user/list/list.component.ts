import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/base';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent extends TableComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
  showActionModal() {}
}
