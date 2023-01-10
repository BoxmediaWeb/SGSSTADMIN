import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contenedor3Component } from './contenedor3.component';

describe('Contenedor3Component', () => {
  let component: Contenedor3Component;
  let fixture: ComponentFixture<Contenedor3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contenedor3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contenedor3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
