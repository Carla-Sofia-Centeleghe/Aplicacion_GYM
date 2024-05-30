import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesTodasComponent } from './clases-todas.component';

describe('ClasesTodasComponent', () => {
  let component: ClasesTodasComponent;
  let fixture: ComponentFixture<ClasesTodasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasesTodasComponent]
    });
    fixture = TestBed.createComponent(ClasesTodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});