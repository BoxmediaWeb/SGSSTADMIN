import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contenedor2Component } from './contenedor2.component';

describe('Contenedor2Component', () => {
  let component: Contenedor2Component;
  let fixture: ComponentFixture<Contenedor2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contenedor2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contenedor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
