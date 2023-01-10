import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPasswordComponent } from './editar-password.component';

describe('EditarPasswordComponent', () => {
  let component: EditarPasswordComponent;
  let fixture: ComponentFixture<EditarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
