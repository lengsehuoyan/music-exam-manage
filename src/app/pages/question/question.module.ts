import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { QuestionActionComponent } from './modify/modify.component';
import { QuestionRoutingModule } from './question-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingDragComponent } from './setting-drag/setting-drag.component';

@NgModule({
  declarations: [ListComponent, QuestionActionComponent, SettingDragComponent],
  imports: [
    SharedModule,
    QuestionRoutingModule,
  ],
})
export class QuestionModule { }
