import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDetalleDocumentosComponent } from './lista-detalle-documentos.component';

describe('ListaDetalleDocumentosComponent', () => {
  let component: ListaDetalleDocumentosComponent;
  let fixture: ComponentFixture<ListaDetalleDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDetalleDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDetalleDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
