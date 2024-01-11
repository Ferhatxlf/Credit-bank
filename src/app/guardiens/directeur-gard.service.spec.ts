import { TestBed } from '@angular/core/testing';

import { DirecteurGardService } from './directeur-gard.service';

describe('DirecteurGardService', () => {
  let service: DirecteurGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirecteurGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
