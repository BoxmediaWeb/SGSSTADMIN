import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarMaestroComponent } from './generar-maestro.component';

describe('GenerarMaestroComponent', () => {
  let component: GenerarMaestroComponent;
  let fixture: ComponentFixture<GenerarMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
