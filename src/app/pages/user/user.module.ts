import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ModifyComponent, ListComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
