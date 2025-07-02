import { TestBed } from '@angular/core/testing';

import { QuakeService } from './quake.service';
import { provideHttpClient } from '@angular/common/http';

describe('QuakeService', () => {
  let service: QuakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(QuakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
