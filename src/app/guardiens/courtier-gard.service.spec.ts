import { TestBed } from '@angular/core/testing';

import { CourtierGardService } from './courtier-gard.service';

describe('CourtierGardService', () => {
  let service: CourtierGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtierGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
