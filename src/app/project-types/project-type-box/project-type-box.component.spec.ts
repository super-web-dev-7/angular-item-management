import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeBoxComponent } from './project-type-box.component';

describe('ProjectTypeBoxComponent', () => {
  let component: ProjectTypeBoxComponent;
  let fixture: ComponentFixture<ProjectTypeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
