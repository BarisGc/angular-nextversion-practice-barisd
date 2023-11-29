import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredEBooksPageComponent } from './stored-e-books-page.component';

describe('StoredEBooksPageComponent', () => {
  let component: StoredEBooksPageComponent;
  let fixture: ComponentFixture<StoredEBooksPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoredEBooksPageComponent]
    });
    fixture = TestBed.createComponent(StoredEBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
