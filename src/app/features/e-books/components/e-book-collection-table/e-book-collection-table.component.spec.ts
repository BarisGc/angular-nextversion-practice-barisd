import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBookCollectionTableComponent } from './e-book-collection-table.component';

describe('EBookCollectionTableComponent', () => {
  let component: EBookCollectionTableComponent;
  let fixture: ComponentFixture<EBookCollectionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EBookCollectionTableComponent]
    });
    fixture = TestBed.createComponent(EBookCollectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
