import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }

  get isSpinning(): boolean {
    return this.subscriptions.some(value => !value.closed);
  }

  defaultOnDestroy() {
    this.subscriptions.forEach(value => {
      if (value && !value.closed) {
        value.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.defaultOnDestroy();
  }
}
