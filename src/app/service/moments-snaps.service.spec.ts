import { TestBed } from '@angular/core/testing';

import { MomentSnapsService } from './moment-snaps.service';

describe('MomentSnapsService', () => {
  let service: MomentSnapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentSnapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
