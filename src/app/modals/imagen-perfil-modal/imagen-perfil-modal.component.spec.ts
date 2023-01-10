import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPerfilModalComponent } from './imagen-perfil-modal.component';

describe('ImagenPerfilModalComponent', () => {
  let component: ImagenPerfilModalComponent;
  let fixture: ComponentFixture<ImagenPerfilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenPerfilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenPerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
