import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasePuntualComponent } from './clase-puntual.component';

describe('ClasePuntualComponent', () => {
  let component: ClasePuntualComponent;
  let fixture: ComponentFixture<ClasePuntualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasePuntualComponent]
    });
    fixture = TestBed.createComponent(ClasePuntualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
