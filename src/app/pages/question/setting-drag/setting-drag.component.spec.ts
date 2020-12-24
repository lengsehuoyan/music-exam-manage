import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDragComponent } from './setting-drag.component';

describe('SettingDragComponent', () => {
  let component: SettingDragComponent;
  let fixture: ComponentFixture<SettingDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
