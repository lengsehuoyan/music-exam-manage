import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DragContainerDirective } from 'src/app/shared/directives';
import { Rectangle } from 'src/app/tools';

@Component({
  selector: 'app-setting-drag',
  templateUrl: './setting-drag.component.html',
  styleUrls: ['./setting-drag.component.less'],
})
export class SettingDragComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('target')
  target: ElementRef;

  /**
   * options container
   */
  @ViewChild(DragContainerDirective)
  container: DragContainerDirective;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.container.getOriginalPositions());
  }

  imgDragEnded(img: HTMLElement): void {
    console.log(img);
  }

  getOffsets(): any[] {
    const targetElement = this.target.nativeElement as HTMLElement;
    const tdr: DOMRect = targetElement.getBoundingClientRect();
    const rect = new Rectangle(tdr.x, tdr.y, tdr.width, tdr.height);
    console.log('rect', rect);
    return [];
  }

  save($event: any): void {
    const offsets = this.getOffsets();
    console.log(offsets);
  }

}
