import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutacionDetalleDocumentoModalComponent } from './mutacion-detalle-documento-modal.component';

describe('MutacionDetalleDocumentoModalComponent', () => {
  let component: MutacionDetalleDocumentoModalComponent;
  let fixture: ComponentFixture<MutacionDetalleDocumentoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutacionDetalleDocumentoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutacionDetalleDocumentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
