import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoMaestroComponent } from './formato-maestro.component';

describe('FormatoMaestroComponent', () => {
  let component: FormatoMaestroComponent;
  let fixture: ComponentFixture<FormatoMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatoMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
