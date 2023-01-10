import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDocumentoComponent } from './vista-documento.component';

describe('VistaDocumentoComponent', () => {
  let component: VistaDocumentoComponent;
  let fixture: ComponentFixture<VistaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
