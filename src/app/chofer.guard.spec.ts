import { TestBed } from '@angular/core/testing';

import { ChoferGuard } from './chofer.guard';

describe('ChoferGuard', () => {
  let guard: ChoferGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChoferGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
