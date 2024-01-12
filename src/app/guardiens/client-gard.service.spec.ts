import { TestBed } from '@angular/core/testing';

import { ClientGardService } from './client-gard.service';

describe('ClientGardService', () => {
  let service: ClientGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
