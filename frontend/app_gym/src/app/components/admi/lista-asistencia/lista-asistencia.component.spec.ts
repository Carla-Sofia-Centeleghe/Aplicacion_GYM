import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsistenciaComponent } from './lista-asistencia.component';

describe('ListaAsistenciaComponent', () => {
  let component: ListaAsistenciaComponent;
  let fixture: ComponentFixture<ListaAsistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAsistenciaComponent]
    });
    fixture = TestBed.createComponent(ListaAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
