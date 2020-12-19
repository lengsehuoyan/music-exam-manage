import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconsProviderModule } from './icons-provider.module';
import { QuillModule } from 'ngx-quill';
import { QGQuillComponent } from './components';

// #region your componets & directives
// ...SHARED_COMPONETS, ...POPUPS
const COMPONENTS = [
  QGQuillComponent,
];
const THIRDMODULES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    ...SHARED_ZORRO_MODULES,
    ...THIRDMODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IconsProviderModule,
    FlexLayoutModule,
    ...SHARED_ZORRO_MODULES,
    ...COMPONENTS,
  ],
  entryComponents: [
    // ...POPUPS,
  ]
})
export class SharedModule {}
