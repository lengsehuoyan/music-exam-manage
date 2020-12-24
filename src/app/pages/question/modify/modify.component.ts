import { Component, OnInit, Input } from '@angular/core';
import { Constants, FormComponent } from 'src/app/base';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Question } from 'src/app/models';
import { AppTool } from 'src/app/tools';
import { SettingDragComponent } from '../setting-drag/setting-drag.component';

@Component({
  selector: 'app-question-action',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.less'],
})
export class QuestionActionComponent extends FormComponent implements OnInit {
  @Input()
  data?: Question;

  typeConf = AppTool.listConfig(Constants.KQuestionType);

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(
    private readonly modal: NzModalRef,
    private readonly modalService: NzModalService,
    private readonly message: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      content: ['<h1>123</h1>', [Validators.required]],
    });
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `option_${id}`,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.form.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.form.removeControl(i.controlInstance);
    }
  }

  onSubmit(): void {
    this.submitForm(() => {
      const value = this.form.value;
      // let request: Observable<any>;
      // if (this.isEdit) {
      //   request = this.menuApi.update(this.data.id, value);
      // } else {
      //   request = this.menuApi.add(value);
      // }
      // this.submitSubscription = request.subscribe((r) => {
      //   if (r === true) {
      //     this.message.success(`${this.actionText}成功`);
      //     this.modal.triggerOk();
      //   }
      // });
    });
  }

  onCancelClick($event: any): void {
    this.modal.destroy();
  }

  settingDrag($event: any): void {
    // const params = question ? { data: question } : {};
    this.modalService.create({
      nzTitle: `设置拖拽`,
      nzContent: SettingDragComponent,
      // nzComponentParams: params,
      nzFooter: null,
      nzMaskClosable: false,
      nzWidth: '1024',
      nzOnOk: () => {
        // this.getPageData();
      },
    });
  }

  get isEdit(): boolean {
    // return this.data && this.data.id;
    return true;
  }

  get actionText(): string {
    return this.isEdit ? '编辑' : '新建';
  }
}
