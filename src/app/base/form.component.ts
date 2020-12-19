import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  template: '',
})
export class FormComponent extends BaseComponent {
  /* 提交表单 */
  form: FormGroup;
  /* 表单构建 */
  formBuilder: FormBuilder = new FormBuilder();
  submitSubscription: Subscription;

  /**
   * 构建表单
   *
   * @param {*} controls
   * @memberof FormComponent
   */
  buildForm(controls: any): void {
    this.form = this.formBuilder.group(controls);
  }

  /* 是否提交表单 */
  get submitting(): boolean {
    return this.submitSubscription && !this.submitSubscription.closed;
  }

  /**
   * 提交表单
   *
   * @memberof FormComponent
   */
  submitForm(doSubmit: Function) {
    for (const i in this.form.controls) {
      if (i != null) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      doSubmit();
    }
  }

  /**
   * 获取表单control对象
   *
   * @param {any} name
   * @returns
   * @memberof ChangePwdComponent
   */
  getFormControl(name: string) {
    return this.form.controls[name];
  }

  /**
   * 表单错误
   *
   * @param {string} name
   * @param {(string | Array<string>)} errors
   * @memberof FormComponent
   */
  hasErrors(name: string, errors: string | Array<string>) {
    const control = this.getFormControl(name);
    let error = false;
    // TODO: 多个error处理 ['required','ip']
    if (errors && typeof errors === 'string') {
      error = control.hasError(errors);
    }
    return control.dirty && error;
  }

  /**
   * 重置表单
   *
   * @param {MouseEvent} $event
   * @memberof FormComponent
   */
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      if (key != null) {
        this.form.controls[key].markAsPristine();
      }
    }
  }
}
