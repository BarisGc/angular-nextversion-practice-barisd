import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()">
      <mat-icon matListItemIcon>{{ icon }}</mat-icon>
      <div matListItemTitle><ng-content></ng-content></div>
      <div *ngIf="hint1" matListItemLine>{{ hint1 }}</div>
      <div *ngIf="hint2" matListItemLine>{{ hint2 }}</div>
    </a>
  `,
  styles: [
    `
      a:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint1 = '';
  @Input() hint2 = '';
  @Input() routerLink: string | any[] = '';
  @Output() navigate = new EventEmitter<void>();
}
