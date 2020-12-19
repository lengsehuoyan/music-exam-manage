import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, WelcomeRoutingModule, QuillModule.forRoot()],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
