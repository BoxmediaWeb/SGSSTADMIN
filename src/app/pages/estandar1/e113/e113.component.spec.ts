import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E113Component } from './e113.component';

describe('E113Component', () => {
  let component: E113Component;
  let fixture: ComponentFixture<E113Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E113Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E113Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
