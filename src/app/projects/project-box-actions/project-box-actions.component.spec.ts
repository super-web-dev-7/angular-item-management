import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoxActionsComponent } from './project-box-actions.component';

describe('ProjectBoxActionsComponent', () => {
  let component: ProjectBoxActionsComponent;
  let fixture: ComponentFixture<ProjectBoxActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoxActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoxActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
