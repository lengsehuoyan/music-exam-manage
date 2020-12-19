import { Component, OnInit } from '@angular/core';
import { Quill } from 'quill';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {
  content: any;
  editor: any;
  constructor() {}

  ngOnInit() {}

  /**
   * ngx-quill上传图片需要的方法
   */
  editorCreated(quill: Quill) {
    console.log(quill)
    console.log('quill', quill.getModule('toolbar'));
    const toolbar = quill.getModule('toolbar');
    console.log('toolbar', toolbar);
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  /**
   * ngx-quill上传图片需要的方法
   */
  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    );
    // Imageinput.classList.add('ql-image');
    // Imageinput.addEventListener('change', () => {
    //   const file = Imageinput.files[0];
    //   const data: FormData = new FormData();
    //   data.append('file', file, file.name);
    //   const headers = new HttpHeaders();
    //   headers.append('Accept', 'application/json');
    //   const headerOptions = { headers: headers };
    //   if (Imageinput.files != null && Imageinput.files[0] != null) {
    //     this.http
    //       .post(this.image_upload_url, data, headerOptions)
    //       .subscribe((res) => {
    //         const range = this.editor.getSelection(true);
    //         const index = range.index + range.length;
    //         this.editor.insertEmbed(
    //           range.index,
    //           'image',
    //           _.get(res, 'data', '')
    //         );
    //       });
    //   }
    // });
    Imageinput.click();
  }

  /**
   * 富文本编辑器quill-editor内容变化时change事件
   */
  contentChanged(event: any) {
    this.content = event.html; // 内容编辑
  }
}
