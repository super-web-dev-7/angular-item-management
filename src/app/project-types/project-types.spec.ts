import { TestBed } from '@angular/core/testing';

import { ProjectTypeService } from './project-type.service';

describe('ProjectTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectTypeService = TestBed.get(ProjectTypeService);
    expect(service).toBeTruthy();
  });
});
