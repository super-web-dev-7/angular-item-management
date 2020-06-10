import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypesListComponent } from './project-types-list.component';

describe('ProjectTypesListComponent', () => {
  let component: ProjectTypesListComponent;
  let fixture: ComponentFixture<ProjectTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
