import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E114Component } from './e114.component';

describe('E114Component', () => {
  let component: E114Component;
  let fixture: ComponentFixture<E114Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E114Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E114Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
