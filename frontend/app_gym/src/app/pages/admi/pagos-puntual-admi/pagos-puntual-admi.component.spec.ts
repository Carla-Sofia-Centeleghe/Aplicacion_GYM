import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPuntualAdmiComponent } from './pagos-puntual-admi.component';

describe('PagosPuntualAdmiComponent', () => {
  let component: PagosPuntualAdmiComponent;
  let fixture: ComponentFixture<PagosPuntualAdmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosPuntualAdmiComponent]
    });
    fixture = TestBed.createComponent(PagosPuntualAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
