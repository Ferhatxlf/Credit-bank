import { TestBed } from '@angular/core/testing';

import { CourtierServiceService } from './courtier-service.service';

describe('CourtierServiceService', () => {
  let service: CourtierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
