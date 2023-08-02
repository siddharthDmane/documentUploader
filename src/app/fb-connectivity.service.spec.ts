import { TestBed } from '@angular/core/testing';

import { FbConnectivityService } from './fb-connectivity.service';

describe('FbConnectivityService', () => {
  let service: FbConnectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbConnectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
