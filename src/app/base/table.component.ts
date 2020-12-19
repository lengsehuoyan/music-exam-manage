import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { PageQuery, LResponse, getDefaultQuery } from './definition';

@Component({
  template: '',
})
export class TableComponent extends BaseComponent implements OnInit {
  query: PageQuery<any> = getDefaultQuery();
  listData: LResponse<any> = null;
  sortSet: Set<string> = new Set();

  ngOnInit() {
    this.initSortMap();
    this.resetQuery();
    this.getPageData();
  }

  initSortMap() {}
  getPageData() {}

  onSearch() {
    this.preSearch();
    this.getPageData();
  }

  preSearch() {
    const keys = Object.keys(this.query);
    keys.forEach((key) => {
      const value = this.query[key];
      if (value instanceof Date) {
        this.query[key] = value.valueOf();
      }
      if (typeof value === 'boolean') {
        this.query[key] = value ? 1 : 0;
      }
    });
    this.query.currentPage = 1;
    // console.log('query', this.query);
  }

  resetQuery() {
    if (!this.query) {
      this.query = getDefaultQuery();
    } else {
      this.query.currentPage = 1;
      this.query.t = {};
    }
  }

  onReset() {
    this.resetQuery();
    this.getPageData();
  }
}
