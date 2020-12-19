import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TableComponent } from 'src/app/base';
import { Question } from 'src/app/models';
import { QuestionActionComponent } from '../modify/modify.component';
import { AppTool } from 'src/app/tools';
@Component({
  selector: 'app-question-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent extends TableComponent implements OnInit {
  constructor(private modalService: NzModalService) {
    super();
  }

  ngOnInit(): void {}
  showActionModal(question: Question = null): void {
    const params = question ? { data: question } : {};
    this.modalService.create({
      nzTitle: `${AppTool.getActionText(question)}题目`,
      nzContent: QuestionActionComponent,
      nzComponentParams: params,
      nzFooter: null,
      nzMaskClosable: false,
      nzWidth: '1024',
      nzOnOk: () => {
        this.getPageData();
      },
    });
  }
}
