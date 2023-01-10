import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E1p1Component } from './e1p1.component';

describe('E1p1Component', () => {
  let component: E1p1Component;
  let fixture: ComponentFixture<E1p1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E1p1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E1p1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
