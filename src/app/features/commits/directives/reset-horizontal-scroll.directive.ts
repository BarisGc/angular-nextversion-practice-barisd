import {
  Directive,
  ElementRef,
  Input,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appResetHorizontalScroll]',
  standalone: true,
})
export class ResetHorizontalScrollDirective {
  @Input()
  public set appResetHorizontalScroll(value: boolean) {
    if (value === true) this.reset();
  }

  elementRef = inject(ElementRef);

  reset() {
    this.elementRef.nativeElement.scrollTo(0, 0);
  }
}
