import { TestBed } from '@angular/core/testing';

import { MomentsService } from './moments.service';

describe('MomentsService', () => {
  let service: MomentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
