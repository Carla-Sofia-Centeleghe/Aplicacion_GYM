import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaAbmComponent } from './rutina-abm.component';

describe('RutinaAbmComponent', () => {
  let component: RutinaAbmComponent;
  let fixture: ComponentFixture<RutinaAbmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RutinaAbmComponent]
    });
    fixture = TestBed.createComponent(RutinaAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});