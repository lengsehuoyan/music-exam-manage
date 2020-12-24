import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[sd-dragable]',
})
export class DragableDirective implements OnDestroy {
  @Output()
  private dragEnded: EventEmitter<HTMLImageElement> = new EventEmitter();
  private dragger: Dragger;

  constructor(
    @Inject(DOCUMENT) doc: Document,
    el: ElementRef,
    renderer2: Renderer2
  ) {
    this.dragger = new Dragger(
      el.nativeElement,
      doc,
      renderer2,
      this.dragEnded
    );
  }

  ngOnDestroy(): void {
    this.dragger.destroy();
    this.dragger = null;
  }
}

class Dragger {
  element: HTMLElement;
  doc: Document;
  renderer2: Renderer2;
  dragEnded: EventEmitter<HTMLElement>;

  down = false;
  x = 0;
  y = 0;
  l = 0;
  t = 0;

  handleMouseDown: (e: MouseEvent) => void = null;
  handleMouseMove: (e: MouseEvent) => void = null;
  handleMouseUp: (e: MouseEvent) => void = null;

  constructor(
    element: HTMLElement,
    doc: Document,
    renderer2: Renderer2,
    dragEnded: EventEmitter<HTMLElement>
  ) {
    this.element = element;
    this.doc = doc;
    this.renderer2 = renderer2;
    this.dragEnded = dragEnded;

    this.handleMouseDown = this.onMouseDown.bind(this);
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseUp = this.onMouseUp.bind(this);
    this.start();
  }

  targetPreventDefault(e: MouseEvent): void {
    e.preventDefault();
  }

  onMouseDown(e: MouseEvent): void {
    const { element, doc } = this;
    this.down = true;
    this.renderer2.setStyle(element, 'cursor', 'move');
    this.x = e.clientX;
    this.y = e.clientY;
    this.l = element.offsetLeft;
    this.t = element.offsetTop;

    doc.addEventListener('mousemove', this.handleMouseMove);
    element.addEventListener('mousemove', this.targetPreventDefault);
    element.addEventListener('mouseup', this.handleMouseUp);
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.down) {
      return;
    }
    const { x, y, l, t, element, renderer2 } = this;
    const nx = e.clientX;
    const ny = e.clientY;
    const nl = nx - (x - l);
    const nt = ny - (y - t);
    renderer2.setStyle(element, 'left', `${nl}px`);
    renderer2.setStyle(element, 'top', `${nt}px`);
  }

  onMouseUp(e: MouseEvent): void {
    const { doc, element } = this;
    doc.removeEventListener('mousemove', this.handleMouseMove);
    element.removeEventListener('mousemove', this.targetPreventDefault);
    element.removeEventListener('mouseup', this.handleMouseUp);
    this.renderer2.setStyle(element, 'cursor', 'default');
    this.down = false;
    this.dragEnded.emit(element);
  }

  start(): void {
    const { element } = this;
    element.addEventListener('mousedown', this.handleMouseDown);
  }

  destroy(): void {
    const { element } = this;
    element.removeEventListener('mousedown', this.handleMouseDown);
  }
}


