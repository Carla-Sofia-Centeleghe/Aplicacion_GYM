import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesAsistenciaAdmiComponent } from './clases-asistencia-admi.component';


describe('ClasesAsistenciaAdmiComponent', () => {
  let component: ClasesAsistenciaAdmiComponent;
  let fixture: ComponentFixture<ClasesAsistenciaAdmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasesAsistenciaAdmiComponent]
    });
    fixture = TestBed.createComponent(ClasesAsistenciaAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});