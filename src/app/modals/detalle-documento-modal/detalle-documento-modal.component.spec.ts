import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDocumentoModalComponent } from './detalle-documento-modal.component';

describe('DetalleDocumentoModalComponent', () => {
  let component: DetalleDocumentoModalComponent;
  let fixture: ComponentFixture<DetalleDocumentoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDocumentoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDocumentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
