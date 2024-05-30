import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRutinaComponent } from './editar-rutina.component';

describe('EditarRutinaComponent', () => {
  let component: EditarRutinaComponent;
  let fixture: ComponentFixture<EditarRutinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarRutinaComponent]
    });
    fixture = TestBed.createComponent(EditarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
