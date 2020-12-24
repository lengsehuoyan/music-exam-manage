import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { AppTool } from 'src/app/tools';
import { Position } from './drag.interface';

@Directive({
  selector: '[sd-drag-container]',
})
export class DragContainerDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  // 记录各元素 globalposition
  private originalPositions: Position[] = [];
  private images: HTMLElement[] = [];

  ngAfterViewInit(): void {
    console.log(this.el);
    const childNodes = (this.el.nativeElement as HTMLDivElement).childNodes;
    const map = new Map<HTMLElement, Position>();
    childNodes.forEach((node: ChildNode, idx: number) => {
      const elemnt = node as HTMLElement;
      this.images.push(elemnt);
      map.set(elemnt, { x: elemnt.offsetLeft, y: elemnt.offsetTop });
      this.originalPositions[idx] = AppTool.getGlobalPosition(elemnt);
    });
    map.forEach((position, node) => {
      this.renderer2.setStyle(node, 'left', `${position.x}px`);
      this.renderer2.setStyle(node, 'top', `${position.y}px`);
      this.renderer2.setStyle(node, 'position', 'absolute');
    });
  }

  getOriginalPositions(): Position[] {
    return this.originalPositions;
  }

  getImages(): HTMLElement[] {
    return this.images;
  }
}


