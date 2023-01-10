import { TestBed } from '@angular/core/testing';

import { ImagenPerfilModalService } from './imagen-perfil-modal.service';

describe('ImagenPerfilModalService', () => {
  let service: ImagenPerfilModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenPerfilModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
