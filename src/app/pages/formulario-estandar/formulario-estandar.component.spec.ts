import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEstandarComponent } from './formulario-estandar.component';

describe('FormularioEstandarComponent', () => {
  let component: FormularioEstandarComponent;
  let fixture: ComponentFixture<FormularioEstandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEstandarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
