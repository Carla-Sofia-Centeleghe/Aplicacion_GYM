import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProfesoresComponent } from './ver-profesores.component';

describe('VerProfesoresComponent', () => {
  let component: VerProfesoresComponent;
  let fixture: ComponentFixture<VerProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProfesoresComponent]
    });
    fixture = TestBed.createComponent(VerProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
