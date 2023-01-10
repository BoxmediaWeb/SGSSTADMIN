import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E112Component } from './e112.component';

describe('E112Component', () => {
  let component: E112Component;
  let fixture: ComponentFixture<E112Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E112Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E112Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
