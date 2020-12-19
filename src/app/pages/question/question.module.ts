import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { QuestionActionComponent } from './modify/modify.component';
import { QuestionRoutingModule } from './question-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListComponent, QuestionActionComponent],
  imports: [
    SharedModule,
    QuestionRoutingModule,
  ],
})
export class QuestionModule { }
