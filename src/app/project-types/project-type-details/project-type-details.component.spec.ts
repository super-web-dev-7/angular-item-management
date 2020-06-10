import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeDetailsComponent } from './project-type-details.component';

describe('ProjectTypeDetailsComponent', () => {
  let component: ProjectTypeDetailsComponent;
  let fixture: ComponentFixture<ProjectTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
