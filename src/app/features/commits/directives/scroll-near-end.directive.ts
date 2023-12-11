import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appScrollNearEnd]',
  standalone: true,
  providers: [],
})
export class ScrollNearEndDirective {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  /**
   * threshold in PX when to emit before page end scroll
   */
  @Input() threshold = 100;

  constructor(private el: ElementRef) {
    console.log(this.el);
  }

  ngOnInit(): void {}

  @HostBinding('style.overflowY') overflowY = 'auto';
  @HostListener('scroll', ['$event.target'])
  scrollEvent(_event: KeyboardEvent) {
    // Get the height of the element to which the directive is attached
    const heightOfElement = this.el.nativeElement.scrollHeight;
    console.log('heightOfElement', heightOfElement);
    // Get the current Y scroll position (change by scrolling)
    const currentScrolledY = this.el.nativeElement.scrollTop;
    console.log('currentScrolledY', currentScrolledY);

    // Get the height of the viewed window (constant value, but shrinks if dev tools is open)
    const innerHeight = window.innerHeight;
    console.log('innerHeight', innerHeight);

    const scrollToBottom = heightOfElement - currentScrolledY - innerHeight;
    console.log('scrollToBottom', scrollToBottom);
    if (scrollToBottom < this.threshold) {
      console.log(
        '%c [ScrollNearEndDirective]: emit',
        'color: #bada55; font-size: 20px'
      );
      this.nearEnd.emit();
    }
  }
}

// https://dev.to/krivanek06/angular-infinite-scrolling-2jab
// The best possible scenario I could come up with is to create an appScrollNearEnd directive, that we can attach to any element and it will emit a value to the parent component if the user scrolled to the end of the page.

// NOTE: Because we implement an infinite scroll, the solution will only work if the table is the last component in the page. This is usually the case as if you once have an infinite scroll attached to anything, it is most likely your last element, however, I just wanted to highlight this, because the computation involves accessing the page height and calculating whether we approach its end or not.
