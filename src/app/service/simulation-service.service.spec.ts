import { TestBed } from '@angular/core/testing';

import { SimulationServiceService } from './simulation-service.service';

describe('SimulationServiceService', () => {
  let service: SimulationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
