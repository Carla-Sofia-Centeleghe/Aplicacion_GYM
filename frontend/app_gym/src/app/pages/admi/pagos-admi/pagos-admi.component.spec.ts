import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdmiComponent } from './pagos-admi.component';

describe('PagosAdmiComponent', () => {
  let component: PagosAdmiComponent;
  let fixture: ComponentFixture<PagosAdmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosAdmiComponent]
    });
    fixture = TestBed.createComponent(PagosAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
