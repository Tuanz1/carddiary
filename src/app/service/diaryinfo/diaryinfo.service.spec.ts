import { TestBed } from '@angular/core/testing';

import { DiaryinfoService } from './diaryinfo.service';

describe('DiaryinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaryinfoService = TestBed.get(DiaryinfoService);
    expect(service).toBeTruthy();
  });
});
