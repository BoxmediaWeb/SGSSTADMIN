import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaestroComponent } from './ver-maestro.component';

describe('VerMaestroComponent', () => {
  let component: VerMaestroComponent;
  let fixture: ComponentFixture<VerMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
