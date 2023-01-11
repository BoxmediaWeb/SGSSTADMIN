import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDocumentoComponent } from './pdf-documento.component';

describe('PdfDocumentoComponent', () => {
  let component: PdfDocumentoComponent;
  let fixture: ComponentFixture<PdfDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
