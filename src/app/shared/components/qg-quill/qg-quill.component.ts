import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Quill } from 'quill';

export const Q_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QGQuillComponent),
  multi: true,
};

@Component({
  selector: 'sd-qg-quill',
  templateUrl: './qg-quill.component.html',
  styleUrls: ['./qg-quill.component.less'],
  providers: [Q_VALUE_ACCESSOR],
})
export class QGQuillComponent implements ControlValueAccessor {
  disabled = false;
  content: string;
  editor: Quill;

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  /**
   * ngx-quill上传图片需要的方法
   */
  editorCreated(quill: Quill): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  /**
   * ngx-quill上传图片需要的方法
   */
  imageHandler(): void {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    );
    Imageinput.click();
  }

  /**
   * 富文本编辑器quill-editor内容变化时change事件
   */
  contentChanged(event: any): void {
    this.content = event.html; // 内容编辑
  }

  writeValue(value: any): void {
    this.content = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
