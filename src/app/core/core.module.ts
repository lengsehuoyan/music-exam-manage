import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES } from './services/index';
import { API } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { STORE } from './services/store';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
  ],
  providers: [
    ...SERVICES,
    ...API,
    ...STORE,
  ],
})
export class CoreModule { }
