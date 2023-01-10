import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecortarImagenComponent } from './recortar-imagen.component';

describe('RecortarImagenComponent', () => {
  let component: RecortarImagenComponent;
  let fixture: ComponentFixture<RecortarImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecortarImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecortarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
