import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRoleComponent } from './crear-role.component';

describe('CrearRoleComponent', () => {
  let component: CrearRoleComponent;
  let fixture: ComponentFixture<CrearRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
