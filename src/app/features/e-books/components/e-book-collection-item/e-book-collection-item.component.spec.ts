import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBookCollectionItemComponent } from './e-book-collection-item.component';

describe('EBookCollectionItemComponent', () => {
  let component: EBookCollectionItemComponent;
  let fixture: ComponentFixture<EBookCollectionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EBookCollectionItemComponent]
    });
    fixture = TestBed.createComponent(EBookCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
