import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contenedor4Component } from './contenedor4.component';

describe('Contenedor4Component', () => {
  let component: Contenedor4Component;
  let fixture: ComponentFixture<Contenedor4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contenedor4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contenedor4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
