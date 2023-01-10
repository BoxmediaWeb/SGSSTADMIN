import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableConfirmacionComponent } from './variable-confirmacion.component';

describe('VariableConfirmacionComponent', () => {
  let component: VariableConfirmacionComponent;
  let fixture: ComponentFixture<VariableConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
